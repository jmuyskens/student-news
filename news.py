import sqlite3
from message import Message
from contextlib import closing
from flask import Flask, request, session, g, redirect, url_for, \
    abort, render_template, flash, jsonify

# configuration
DATABASE = 'news.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'
VALID_TAGS = ['free', 'food', 'film', 'music', 'art', 'socialjustice', 'academics', 'lecture', 'weekend', 'contest', 'comedy', 'conference', 'prayer', 'charity', 'drama']

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)

def connect_db():
    return sqlite3.connect(app.config['DATABASE'])


def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql') as f:
            db.cursor().executescript(f.read())
        db.commit()


@app.before_request
def before_request():
    g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
    g.db.close()

@app.route('/')
def show_entries():
    cur = g.db.execute('select title, body, sender, email, id, approved, tags from entries order by id desc')
    entries = [dict(title=row[0], body=row[1], sender=row[2], email=row[3], id=row[4], approved=row[5], tags=row[6].split(",")) for row in cur.fetchall()]
    return render_template('show_entries.html', entries=entries, tags=VALID_TAGS)

@app.route('/add', methods=["POST"])
def add_entry():

        if session.get('logged_in'):
                appr = 1
        else:
                appr = 0

        g.db.execute('insert into entries (title, body, sender, email, approved, tags) values (?, ?, ?, ?, ?, ?)',
                     [request.json['title'],      \
                      request.json['body'],       \
                      request.json['sender'],     \
                      request.json['email'],      \
                      appr,                           \
                      ",".join(request.json['tags']) ])
        g.db.commit()
        if not session.get('logged_in'):
                flash('We will post your entry pending approval')
        return jsonify("")

@app.route('/del')
def del_entry():
    if not session.get('logged_in'):
        abort(401)
    id = request.args.get('id', 0, type=int)
    g.db.execute('delete from entries where id=' + str(id))
    g.db.commit()
    return jsonify('') # better way to do this?

@app.route('/app')
def app_entry():
    if not session.get('logged_in'):
        abort(401)
    id = request.args.get('id', 0, type=int)
    g.db.execute('update entries SET approved = 1 WHERE id = ' + str(id))
    g.db.commit()
    return jsonify('')

@app.route('/login',methods=['GET','POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('You were logged in')
            return redirect(url_for('show_entries'))
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('You were logged out')
    return redirect(url_for('show_entries'))
        
if __name__ == '__main__':
    app.run(host='0.0.0.0')
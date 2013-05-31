drop table if exists entries;
create table entries (
       id integer primary key autoincrement,
       title string not null,
       body string not null,
       sender string not null,
       email string not null,
       approved integer not null,
       tags string not null
);

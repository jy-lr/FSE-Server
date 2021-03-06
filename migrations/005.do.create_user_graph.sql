CREATE TABLE user_graph (
  id integer primary key generated by default as identity,
  groupid integer references FSE_group(id),
  userid integer references FSE_users(id),
  date_created timestamp default now() not null,
  equity integer not null
);
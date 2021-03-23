drop database if exists todo_db;
create database todo_db;
use todo_db;

drop user if exists comp4537_team_assignment@localhost;
create user comp4537_team_assignment@localhost identified with mysql_native_password by 'bad_password';
grant all privileges on todo_db.* to comp4537_team_assignment@localhost;
flush privileges;

create table endpoints (
    endpointId int auto_increment not null,
    endpointName varchar(200) not null ,
    hitCount int not null,
    primary key (endpointId)
);

insert into endpoints(endpointName, hitCount)VALUES
      ('/end1', 0),
      ('/end2', 0),
      ('/end3', 0),
      ('/end4', 0),
      ('/end5', 0),
      ('/end6', 0),
      ('/end7', 0),
      ('/end8', 0),
      ('/end9', 0),
      ('/end10', 0),
      ('/end11', 0),
      ('/end12', 0);

create table users(
    userId int auto_increment not null,
    email varchar(500) not null unique,
    passwordHash varchar(100) not null,
    primary key(userId)
);

create table lists(
    listId int auto_increment ,
    description varchar(1000) not null ,
    ownerId int not null ,
    primary key (listId),
    foreign key (ownerId)
                  references users (userId)
                  on update cascade
                  on delete cascade
);

create table listItems (
    itemId int auto_increment not null ,
    description varchar(1000) not null ,
    listId int not null ,
    primary key (itemId),
    foreign key (listId)
                        references lists (listId)
                        on update cascade
                        on delete cascade
);

delimiter $$

create procedure addEndpointHit(in p_endpointName varchar(200))
begin
    update endpoints e
    set e.hitCount = e.hitCount + 1
    where e.endpointName LIKE p_endpointName;
end;

create procedure addUser(in p_email varchar(1000), in p_passwordHash varchar(1000))
begin
    insert into users (email, passwordHash) values (p_email, p_passwordHash);
    call addEndpointHit('end1');
end $$

create procedure checkCredentials(in p_email varchar(1000), in p_passwordHash varchar(1000))
begin
    select count(u.userId) from users u where
          u.email = p_email and
          u.passwordHash = p_passwordHash;
end $$

create procedure addList(in p_ownerId int, p_description varchar(1000))
begin
    insert into lists(description, ownerId) VALUES (p_description, p_ownerId);
    call addEndpointHit('end1');
end $$

create procedure addListItem(in p_listId int, p_description varchar(1000))
begin
    insert into listItems(description, listId) VALUES (p_description, p_listId);
    call addEndpointHit('end1');
end $$

create procedure deleteList(in p_listId int)
begin
    delete from lists l where l.listId = p_listId;
    call addEndpointHit('end1');
end $$

create procedure deleteListItem(in p_itemId int)
begin
    delete from listItems li where li.itemId = p_itemId;
    call addEndpointHit('end1');
end $$

create procedure updateList(in p_listId int, in p_description varchar(1000))
begin
    update lists l
        set l.description = p_description
    where l.listId = p_listId;
    call addEndpointHit('end1');
end $$

create procedure updateListItem(in p_itemId int, in p_description varchar(1000))
begin
    update listItems li
    set li.description = p_description
    where li.itemId = p_itemId;
    call addEndpointHit('end1');
end $$

create procedure getUserLists(in p_ownerId int)
begin
    select l.listId, l.description from lists l where l.ownerId = p_ownerId;
    call addEndpointHit('end1');
end $$

create procedure getListItems(in p_listId int)
begin
    select li.itemId, li.description from listItems li where li.listId = p_listId;
    call addEndpointHit('end1');
end $$

create procedure checkListOwnership(in p_ownerId int, in p_listId int)
begin
    select 0 < count(l.listId) from lists l where l.listId = p_listId and l.ownerId = p_ownerId;
    call addEndpointHit('end1');
end $$

create procedure checkItemOwnership(in p_ownerId int, in p_itemId int )
begin
    select 0 < count(li.itemId) from listItems li
    join lists l on l.listId = li.listId
    where li.itemId = p_itemId and l.ownerId = p_ownerId;
    call addEndpointHit('end1');
end $$

create procedure getEndpointCounts()
begin
    select e.endpointName, e.hitCount from endpoints e;
    call addEndpointHit('end1');
end $$

delimiter ;
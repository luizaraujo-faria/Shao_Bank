create database dbShao_Bank;
use dbShao_Bank;

create table tbUser(
id int primary key auto_increment,
user_name varchar(100) not null,
email varchar(100) unique not null,
user_password varchar(150) not null check(user_password > 8),
created_at datetime
);

delimiter $$
create procedure spCreate_User(
	vUser_Name varchar(100),
    vEmail varchar(100),
    vPassword varchar(150)
)
begin
	if(not exists(select * from tbUser where email = vEmail limit 1))
    then
		insert into tbUser(user_name, email, user_password)
        values(vUser_Name, vEmail, vPassword);
    end if;
end;
$$
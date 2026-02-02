if not exists create database dbShao_Bank;
use dbShao_Bank;

create table tbUser(
id int primary key auto_increment,
userName varchar(100) not null,
email varchar(100) unique not null,
userPassword varchar(150) not null check(CHAR_LENGTH(userPassword) >= 8),
createdAt datetime default CURRENT_TIMESTAMP()
);

drop table tbUser;

create procedure spCreate_User(
	vUserName varchar(100),
    vEmail varchar(100),
    vPassword varchar(150)
)
begin
	if(not exists(select * from tbUser where email = vEmail limit 1))
    then
		insert into tbUser(userName, email, userPassword)
        values(vUserName, vEmail, vPassword);
    end if;
end;


drop procedure spCreate_User;



create table departments(
    id serial primary key,
    department_name text
);

create table items(
    id serial primary key,
    department integer,
    description text,
    image text,
    price numeric(10,2),
    additional_details text
);

create table users(
    id serial primary key,
    username varchar(20) not null,
    password text not null,
    first_name varchar(20) not null,
    last_name varchar(20) not null,
    email text not null,
    phone_number char(10),
    zipcode char(5)
);

create table checkout(
    id serial primary key,
    user_id integer,
    item_id integer,
    quantity integer,
    cart_total numeric(10,2)
);


create table orders(
    id serial primary key,
    user_id integer,
    item_id integer,
    total_price numeric(10,2),
    email text,
    phone integer
);

create table cart(
    id serial primary key,
    user_id integer,
    item_id integer,
    quantity integer,
    total_price numeric(10,2)
);






--show one department:
	select *
	from departments d
	join items I on i.department=d.id
	where d.id = $1;
	
	
-- users cart:
	select *
	from cart c
	join items I
	on c.item_id = i.id
	where c.user_id = $1;
	
--select one item:
	select *
	from items
	where id=$1;
	
--remove item from cart:
	delete
	from cart
	where user_id=$1 and item_id=$2;
	select * from cart where user_id=$1;
	
--checkout:
	insert into checkout
	select * from cart
	where user_id=$1;

--clear cart on successful checkout:
	delete 
	from cart
	where user_id = $1;
	
--put items from checkout into orders:
	select *
	from checkout c
	join items I 
	on c.item_id = i.id
    where c.user_id = $1;

--add to cart:
	insert into cart(user_id,item_id,quantity)
    values ($1,$2,$3)
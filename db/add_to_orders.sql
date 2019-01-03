insert into checkout
select * from cart 
where user_id=$1;

DELETE
from cart
where user_id=$1;

-- insert into orders(user_id,item_id,total_price)
-- values($1,$2,$3);
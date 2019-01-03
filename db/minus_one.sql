update cart
set quantity=$1-1
where item_id=$2 and user_id=$3;

select * 
from cart join items i on cart.item_id=i.id
where user_id =$3
order by i.id;
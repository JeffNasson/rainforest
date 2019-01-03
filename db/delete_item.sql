delete 
from cart
where item_id=$1 and user_id=$2;

select * 
from cart join items i on cart.item_id=i.id
where user_id =$2
order by i.id;
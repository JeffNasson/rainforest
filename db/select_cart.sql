select * 
from cart
where user_id=$1 and item_id=$2
order by item_id;
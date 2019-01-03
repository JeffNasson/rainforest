select sum(price*quantity) as total_price
from cart join items i on cart.item_id=i.id
where user_id=$1;
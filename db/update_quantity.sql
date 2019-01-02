update cart
set quantity = $1
where item_id=$2 and user_id=$3
;

select *
from cart
where user_id=$3;

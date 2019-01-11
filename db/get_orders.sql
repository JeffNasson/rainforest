select * 
from checkout c
join items i
on c.item_id = i.id
where c.user_id=$1;
SELECT *
FROM cart c
JOIN items i
on c.item_id = i.id
WHERE c.user_id=$1;
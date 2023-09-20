create trigger after_action_update
after update on PEOPLE_INPUT
for currentrow

update PEOPLE_INPUT



set PEOPLE_INPUT.MODIFIED_DATE = CURRENT_TIMESTAMP
where PEOPLE_INPUT.INPUT_ID = OLD.INPUT_ID;
```
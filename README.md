# Websocket desk server. 

## API requests

### Connect to desk: 

Request:
```
{
    request: 'connect',
    desk_id: _<desk id>,_
    character_id: _<connecting character id>_
}
```
Response: 
```
{
    request: 'connect',
    state: _<'ok', 'error'>_
}
```

***

### Add argument

Request:
```
{
    request: 'use-argument',
    desk_id: _<desk id>,_
    character_id: _<character id>,_
    argument_id: _<argument id>,_
    slot_id: _<slot id [0..19]>_
}
```
Response: 
```
{
    request: 'use-argument',
    state: _<'ok', 'error'>_
}
```

***

### Remove argument

Request:
```
{
    request: 'remove-argument',
    desk_id: _<desk id>,_
    character_id: _<character id>,_
    slot_id: _<slot id [0..19]>_
}
```
Response: 
```
{
    request: 'remove-argument',
    state: _<'ok', 'error'>_
}
```

## Broadcasts
On any commited action performed by any player currently connected to a desk, every other player on the same desk receives a token with current desk state.
```
{
    arguments: [
        { 
            slot_id: _<slot id [0..19]>_
            argument_id: _<argument id>_
        },
        ...
    ]
}
```

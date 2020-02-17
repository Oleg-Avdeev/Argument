# Websocket desk server. 

## API requests

### Connect to desk: 

Request:
```
{
    request: 'connect',
    desk_id: <desk id>,
    character_id: <connecting character id>
}
```
Response: 
```
{
    request: 'connect',
    state: <'ok', 'error'>
}
```

***

### Disconnect from desk: 

Request:
```
{
    request: 'disconnect',
    desk_id: <desk id>,
    character_id: <character id>
}
```
Response: 
```
{
    request: 'disconnect',
    state: <'ok', 'error'>
}
```

***

### Add argument

Request:
```
{
    request: 'use-argument',
    desk_id: <desk id>,
    character_id: <character id>,
    argument_id: <argument id>,
    slot_id: <slot id [0..19]>
}
```
Response: 
```
{
    request: 'use-argument',
    state: <'ok', 'error'>
}
```

***

### Remove argument

Request:
```
{
    request: 'remove-argument',
    desk_id: <desk id>,
    character_id: <character id>,
    slot_id: <slot id [0..19]>
}
```
Response: 
```
{
    request: 'remove-argument',
    state: <'ok', 'error'>
}
```

## Broadcasts
On any commited action performed by any player currently connected to a desk, every other player on the same desk receives a token with current desk state.
```
{
    connected_players: [
        <connected player id>,
        ...
    ],
    arguments: [
        { 
            slot_id: <slot id [0..19]>
            argument_id: <argument id>
        },
        ...
    ]
}
```

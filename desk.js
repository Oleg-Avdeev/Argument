
var api = "www.server.com/api";

exports.update = function(desk_id, character_id, slot_id, argument_id) {
    var endpoint = `${api}/desk/${desk_id}/arguments`;
    if (argument_id !== null)
    {
        var body = { slot: slot_id, character: character_id, argument: argument_id };
        return request(endpoint, 'post', body);
    }
    else
    {
        var body = { slot: slot_id, character: character_id};
        return request(endpoint, 'delete', body);
    }
}

exports.getState = function(desk_id) {
    var endpoint = `${api}/desk/${desk_id}/arguments`;
    return request(endpoint, 'get');
}

function request(url, method, body = null)
{
    const options = {
        method: method,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: body
    };
      
    return fetch(url, options);
}
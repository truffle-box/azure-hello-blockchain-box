const HelloBlockchain = artifacts.require('HelloBlockchain');

contract('HelloBlockchain', function(accounts){
    var meta;
    var requestor = accounts[0];

    it('should create a contract instance with a default message', function(){
        return HelloBlockchain.deployed().then(function(instance){
            meta = instance;
            return meta.RequestMessage.call();
        }).then(function(messageResult){
            return messageResult;
        }).then(function(messageResult){
            assert.equal(messageResult.valueOf(), 'hello', 'Initial contract should return hello as the RequestMessage.');
        });
    });

    it('should create a contract instance with requestor set to account 0', function(){
        return HelloBlockchain.deployed().then(function(instance){
            meta = instance;
            return meta.Requestor.call();
        }).then(function(requestorAddress){
            assert.equal(requestorAddress.valueOf(), requestor, 'Requestor is not correct for the contract instance.');
        });
    });

    it('should create a contract instance with initial state set correctly', function(){
        return HelloBlockchain.deployed().then(function(instance){
            meta = instance;
            return meta.State.call();
        }).then(function(initialState){
            assert.equal(initialState.valueOf(), 0, 'Initial state should be Request');
        });
    });

    it('should create a contract instance and set the request message', function(){
        var initialMessage; 

        return HelloBlockchain.deployed().then(function(instance){
            meta = instance;
            return meta.RequestMessage.call();
        }).then(function(initialRequestMessage){
            initialMessage = initialRequestMessage;
            return meta.SendRequest('test', { from: requestor });
        }).then(function(updateMessageTxResult){
            return meta.RequestMessage.call();
        }).then(function(updatedMessage){
            assert.equal(initialMessage, 'hello', 'Initial message should be hello.');
            assert.equal(updatedMessage, 'test', 'Updated message should be test');
        });
    });

    it('should update an existing contract instance to respond to request', function(){
        var initialState;
        var updatedState;
        
        return HelloBlockchain.deployed().then(function(instance){
            meta = instance;
            return meta.State.call();
        }).then(function(_initialState){
            initialState = _initialState;
            return meta.SendResponse('response test');
        }).then(function(responseTxResult){
            return meta.State.call();
        }).then(function(stateResult){
            updatedState = stateResult;
            return meta.ResponseMessage.call();
        }).then(function(responseMessage){
            assert.equal(initialState, 0, 'Initial state should be 0 (Request)');
            assert.equal(updatedState, 1, 'Updated state should be 1 (Response)');
            assert.equal(responseMessage, 'response test', 'Response message was not set correctly.');
        });
    });
});

$(App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
     @printMessage("Esperando por oponente")
  make_move: (message) ->
    @perform 'make_move', message: message
  printMessage: (message) ->
    snackbarContainer = $('#demo-toast-example')[0];
    data = { message: message, timeout: 5000 };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    switch data.action
      when "game_start"
        App.game.inicio(data, App);
        cargarListeners(App.game);
        @printMessage("Game started!")
      when "make_move"
        App.game.hacerMovimiento(data.msg.message)
      when "opponent_forfeits"
        @printMessage("Opponent forfeits. You win!")
      when "reset"
        App.game.reiniciar();

$ ->
  App.game = App.game = new Partida();
);
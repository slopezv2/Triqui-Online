
$(App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server
     @printMessage("Esperando por oponente")

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
        cargarListeners();
        App.board.position("start")
        App.board.orientation(data.msg)
        @printMessage("Game started! You play as #{data.msg}.")
      when "make_move"
        [source, target] = data.msg.split("-")

        App.board.move(data.msg)
        App.chess.move
          from: source
          to: target
          promotion: "q"
      when "opponent_forfeits"
        @printMessage("Opponent forfeits. You win!")

  turn: ->
    @perform 'turn', message: movement

$ ->
  App.chess = new Chess()

  cfg =
    onDrop: (source, target) =>
      move = App.chess.move
        from: source
        to: target
        promotion: "q"

      if (move == null)
        # illegal move
        return "snapback"
      else
        App.room.perform("make_move", move)

#App.board = ChessBoard("chessboard", cfg)
);
// ------------------------------------------------------------------------
// How To Make A Match-3 Game With HTML5 Canvas
// Copyright (c) 2015 Rembound.com
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/.
//
// http://rembound.com/articles/how-to-make-a-match3-game-with-html5-canvas
// ------------------------------------------------------------------------

// The function gets called when the window is fully loaded
window.onload = () => match3(document.getElementById("viewport"));

function match3(
  canvas,
  rowCount = 8,
  columnCount = 8,
  wTile = 40,
  hTile = 40,
  tiles = [
    '<svg fill="#e0e421" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-sword" transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M8 3V4H9V5H10V6H11V7H12V8H13V9H14V10H15V11H16V12H17V11H19V13H18V14H17V15H18V16H19V17H20V19H19V20H17V19H16V18H15V17H14V18H13V19H11V17H12V16H11V15H10V14H9V13H8V12H7V11H6V10H5V9H4V8H3V7H2V2H7V3H8M7 5H6V4H4V5H5V6H6V7H7V8H8V9H9V10H10V11H11V12H12V13H14V12H13V11H12V10H11V9H10V8H9V7H8V6H7V5Z"></path></g></svg>',
    '<svg fill="#4bd530" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-gamepad-center" stroke="#4bd530"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M14 1V2H15V7H20V8H21V14H20V15H15V20H14V21H8V20H7V15H2V14H1V8H2V7H7V2H8V1H14M13 8H9V9H8V13H9V14H13V13H14V9H13V8Z"></path></g></svg>',
    '<svg fill="#cf2020" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-fire" stroke="#cf2020"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M14 20H7V19H6V18H5V17H4V12H5V10H6V9H7V8H8V9H9V11H10V9H11V5H10V4H9V3H8V2H11V3H13V4H14V5H15V6H16V7H17V9H18V16H17V18H16V19H14M12 18V17H14V16H15V14H16V10H15V8H14V7H13V11H12V13H11V14H10V15H9V14H8V11H7V12H6V16H7V17H8V18Z"></path></g></svg>',
    '<svg fill="#1a469e" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-flask" stroke="#1a469e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11 12H13V14H11V12M14 1V2H15V5H14V7H15V9H16V11H17V13H18V14H19V16H20V20H19V21H3V20H2V16H3V14H4V13H5V11H6V9H7V7H8V5H7V2H8V1H14M12 3H10V8H9V10H8V12H7V13H6V15H5V17H6V16H7V15H8V14H9V15H10V16H11V17H12V18H14V17H15V15H16V14H15V12H14V10H13V8H12V3Z"></path></g></svg>',
    '<svg fill="#5f1c97" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-shield" stroke="#5f1c97"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 4H5V3H7V2H9V1H13V2H15V3H17V4H19V14H18V16H17V18H16V19H15V20H13V21H9V20H7V19H6V18H5V16H4V14H3V4M10 3V4H8V5H6V6H5V13H6V15H7V17H8V18H10V19H12V18H14V17H15V15H16V13H17V6H16V5H14V4H12V3H10Z"></path></g></svg>',
    '<svg fill="#43d5df" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-diamond"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6 2H16V3H17V4H18V5H19V6H20V12H19V13H18V14H17V15H16V16H15V17H14V18H13V19H12V20H10V19H9V18H8V17H7V16H6V15H5V14H4V13H3V12H2V6H3V5H4V4H5V3H6V2M15 5V4H14V6H15V7H17V6H16V5H15M12 6V4H10V6H9V7H13V6H12M8 6V4H7V5H6V6H5V7H7V6H8M4 11H5V12H6V13H7V14H8V12H7V9H4V11M10 12V16H12V12H13V9H9V12H10M14 12V14H15V13H16V12H17V11H18V9H15V12H14Z"></path></g></svg>',
  ],
  tileTypes = ["sword", "hp",  "burst", "mana", "shield", "money"],
  animTime = 0.3
) {
  // Get the canvas and context
  var context = canvas.getContext("2d");

  // Timing and frames per second
  var lastframe = 0;
  var fpstime = 0;
  var framecount = 0;
  var fps = 0;

  // Mouse dragging
  var drag = false;

  // Level object
  var level = {
    x: 0, // X position
    y: 0, // Y position
    columns: columnCount, // Number of tile columns
    rows: rowCount, // Number of tile rows
    tilewidth: wTile, // Visual width of a tile
    tileheight: hTile, // Visual height of a tile
    tiles: [], // The two-dimensional tile array
    selectedtile: { selected: false, column: 0, row: 0 },
  };
  canvas.width = level.columns * level.tilewidth;
  canvas.height = level.rows * level.tileheight;

  // All of the different tile colors in RGB
  var tileData;

  // Clusters and moves that were found
  var clusters = []; // { column, row, length, horizontal }
  var moves = []; // { column1, row1, column2, row2 }

  // Current move
  var currentmove = { column1: 0, row1: 0, column2: 0, row2: 0 };

  // Game states
  var gamestates = { init: 0, ready: 1, resolve: 2 };
  var gamestate = gamestates.init;

  // Score
  var score = 0;

  // Animation variables
  var animationstate = 0;
  var animationtime = 0;
  var animationtimetotal = animTime;

  // Show available moves
  var showmoves = false;

  var isPlayerTurn = true;

  var rowsInTurn = [];

  var pause = false;

  var types = tileTypes;

  function randomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function parseSvg() {
    const parser = new DOMParser();
    const tileData = tiles.map(str => {
      const doc    = parser.parseFromString(str, 'image/svg+xml');
      const svg    = doc.querySelector('svg');
      const pathEl = svg.querySelector('path');
      return {
        id:        svg.getAttribute('id'),
        viewBox:   svg.getAttribute('viewBox'),
        transform: svg.getAttribute('transform') || null,
        fill:      svg.getAttribute('fill'),
        stroke:    svg.getAttribute('stroke') || null,
        d:         pathEl.getAttribute('d'),
      };
    });
    return tileData
  }

  function loadTileImage() {
    tileData = parseSvg()
  }

  // Initialize the game
  function init() {
    loadTileImage();
    // Add mouse events
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseout", onMouseOut);

    // Initialize the two-dimensional tile array
    for (var i = 0; i < level.columns; i++) {
      level.tiles[i] = [];
      for (var j = 0; j < level.rows; j++) {
        // Define a tile type and a shift parameter for animation
        level.tiles[i][j] = { type: randomInt(1, types.length), shift: 0 };
      }
    }

    // New game
    newGame();

    // Enter main loop
    main(0);
  }

  // Main loop
  function main(tframe) {
    // Request animation frames
    window.requestAnimationFrame(main);

    // Update and render the game
    update(tframe);
    render();
  }

  // Update the game state
  function update(tframe) {
    if (pause) {
      // delay to custom function call with rows eaten
      if (tframe - lastframe > 2000) {
        pause = false;
        document.getElementById("notification").style.display = "none";
      }
      return;
    }

    var dt = (tframe - lastframe) / 1000;
    lastframe = tframe;

    // Update the fps counter
    updateFps(dt);

    if (gamestate == gamestates.ready) {
      // Game is ready for player input
      if (rowsInTurn.length > 0) {
        pause = true;
        const merged = Object.values(
          rowsInTurn.reduce((acc, curr) => {
            const { type } = curr;
            if (!acc[type]) {
              acc[type] = { ...curr };
            } else {
              acc[type].length += curr.length;
            }
            return acc;
          }, {})
        );
        merged.forEach((item) => {
          let type = types[item.type];
          var span = document.getElementById(type);
          span.innerHTML = item.length;
        });
        document.getElementById("notification").style.display = "block";
        rowsInTurn = [];
        return;
      }
      // console.log(types)
      types.forEach((item) => {
        var span = document.getElementById(item);
        if (span) span.innerHTML = 0;
      });
      // Check for game over
      if (moves.length <= 0) {
        createLevel();
        return;
      }
      // Let the AI bot make a move on its turn
      if (!isPlayerTurn) {
        animationtime += dt;
        if (animationtime > animationtimetotal) {
          // Check if there are moves available
          findMoves();

          if (moves.length > 0) {
            // Get a random valid move
            var move = moves[Math.floor(Math.random() * moves.length)];

            // Simulate a player using the mouse to swap two tiles
            mouseSwap(move.column1, move.row1, move.column2, move.row2);
          } else {
            // No moves left, Game Over. We could start a new game.
            // newGame();
          }
          animationtime = 0;
        }
      }
    } else if (gamestate == gamestates.resolve) {
      // Game is busy resolving and animating clusters
      animationtime += dt;

      if (animationstate == 0) {
        // Clusters need to be found and removed
        if (animationtime > animationtimetotal) {
          // Find clusters
          findClusters();
          if (clusters.length > 0) {
            rowsInTurn = rowsInTurn.concat(clusters);
            // Add points to the score
            for (var i = 0; i < clusters.length; i++) {
              // Add extra points for longer clusters
              score += 100 * (clusters[i].length - 2);
            }

            // Clusters found, remove them
            removeClusters();

            // Tiles need to be shifted
            animationstate = 1;
          } else {
            // No clusters found, animation complete
            gamestate = gamestates.ready;
          }
          animationtime = 0;
        }
      } else if (animationstate == 1) {
        // Tiles need to be shifted
        if (animationtime > animationtimetotal) {
          // Shift tiles
          shiftTiles();

          // New clusters need to be found
          animationstate = 0;
          animationtime = 0;

          // Check if there are new clusters
          findClusters();
          if (clusters.length <= 0) {
            // Animation complete
            gamestate = gamestates.ready;
          }
        }
      } else if (animationstate == 2) {
        // Swapping tiles animation
        if (animationtime > animationtimetotal) {
          // Swap the tiles
          swap(
            currentmove.column1,
            currentmove.row1,
            currentmove.column2,
            currentmove.row2
          );

          // Check if the swap made a cluster
          findClusters();
          if (clusters.length > 0) {
            // Valid swap, found one or more clusters
            // Prepare animation states
            animationstate = 0;
            animationtime = 0;
            gamestate = gamestates.resolve;
          } else {
            // Invalid swap, Rewind swapping animation
            animationstate = 3;
            animationtime = 0;
            isPlayerTurn = !isPlayerTurn;
          }

          // Update moves and clusters
          findMoves();
          findClusters();
        }
      } else if (animationstate == 3) {
        // Rewind swapping animation
        if (animationtime > animationtimetotal) {
          // Invalid swap, swap back
          swap(
            currentmove.column1,
            currentmove.row1,
            currentmove.column2,
            currentmove.row2
          );

          // Animation complete
          gamestate = gamestates.ready;
        }
      }

      // Update moves and clusters
      findMoves();
      findClusters();
    }
  }

  function updateFps(dt) {
    if (fpstime > 0.25) {
      // Calculate fps
      fps = Math.round(framecount / fpstime);

      // Reset time and framecount
      fpstime = 0;
      framecount = 0;
    }

    // Increase time and framecount
    fpstime += dt;
    framecount++;
  }

  // Render the game
  function render() {
    // Draw the frame
    drawFrame();
    // Draw level background
    var levelwidth = level.columns * level.tilewidth;
    var levelheight = level.rows * level.tileheight;
    context.fillStyle = "#000000";
    context.fillRect(level.x - 4, level.y - 4, levelwidth + 8, levelheight + 8);

    // Render tiles
    renderTiles();

    // Render clusters
    renderClusters();

    // Render moves, when there are no clusters
    if (showmoves && clusters.length <= 0 && gamestate == gamestates.ready) {
      renderMoves();
    }

    // Game Over overlay
    if (gameover) {
      context.fillStyle = "rgba(0, 0, 0, 0.8)";
      context.fillRect(level.x, level.y, levelwidth, levelheight);

      context.fillStyle = "#ffffff";
      context.font = "24px Verdana";
      drawCenterText(
        "Game Over!",
        level.x,
        level.y + levelheight / 2 + 10,
        levelwidth
      );
    }
  }

  // Draw a frame with a border
  function drawFrame() {
    // Draw background and a border
    context.fillStyle = "#d0d0d0";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#e8eaec";
    context.fillRect(1, 1, canvas.width - 2, canvas.height - 2);
  }

  // Render tiles
  function renderTiles() {
    for (var i = 0; i < level.columns; i++) {
      for (var j = 0; j < level.rows; j++) {
        // Get the shift of the tile for animation
        var shift = level.tiles[i][j].shift;

        // Calculate the tile coordinates
        var coord = getTileCoordinate(
          i,
          j,
          0,
          (animationtime / animationtimetotal) * shift
        );

        // Check if there is a tile present
        if (level.tiles[i][j].type >= 0) {
          // Get the color of the tile
          var index = level.tiles[i][j].type;

          // Draw the tile using the color

          drawImage(coord.tilex, coord.tiley, index);
        }

        // Draw the selected tile
        if (level.selectedtile.selected) {
          if (level.selectedtile.column == i && level.selectedtile.row == j) {
            // Draw a red tile
            drawTile(coord.tilex, coord.tiley, 255, 0, 0, 0.3);
          }
        }
      }
    }

    // Render the swap animation
    if (
      gamestate == gamestates.resolve &&
      (animationstate == 2 || animationstate == 3)
    ) {
      // Calculate the x and y shift
      var shiftx = currentmove.column2 - currentmove.column1;
      var shifty = currentmove.row2 - currentmove.row1;

      // First tile
      var coord1 = getTileCoordinate(
        currentmove.column1,
        currentmove.row1,
        0,
        0
      );
      var coord1shift = getTileCoordinate(
        currentmove.column1,
        currentmove.row1,
        (animationtime / animationtimetotal) * shiftx,
        (animationtime / animationtimetotal) * shifty
      );
      var col1 =
        level.tiles[currentmove.column1][currentmove.row1].type;

      // Second tile
      var coord2 = getTileCoordinate(
        currentmove.column2,
        currentmove.row2,
        0,
        0
      );
      var coord2shift = getTileCoordinate(
        currentmove.column2,
        currentmove.row2,
        (animationtime / animationtimetotal) * -shiftx,
        (animationtime / animationtimetotal) * -shifty
      );
      var index =
        level.tiles[currentmove.column2][currentmove.row2].type;

      // Draw a black background
      drawTile(coord1.tilex, coord1.tiley, 0, 0, 0);
      drawTile(coord2.tilex, coord2.tiley, 0, 0, 0);

      // Change the order, depending on the animation state
      if (animationstate == 2) {
        // Draw the tiles
        drawImage(coord1shift.tilex, coord1shift.tiley, index);
        drawImage(coord2shift.tilex, coord2shift.tiley, index);
      } else {
        // Draw the tiles
        drawImage(coord2shift.tilex, coord2shift.tiley, index);
        drawImage(coord1shift.tilex, coord1shift.tiley, index);
      }
    }
  }

  // Get the tile coordinate
  function getTileCoordinate(column, row, columnoffset, rowoffset) {
    var tilex = level.x + (column + columnoffset) * level.tilewidth;
    var tiley = level.y + (row + rowoffset) * level.tileheight;
    return { tilex: tilex, tiley: tiley };
  }

  function drawTile(x, y, r, g, b, opacity = 1) {
    context.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    context.fillRect(x + 2, y + 2, level.tilewidth - 4, level.tileheight - 4);
  }

  // Draw a tile with a color
  function drawImage(x, y, index) {
    let tile = tileData[index];
    if (!tile) return;
    context.fillStyle = "#ffffff"; // Set background color to white
    context.fillRect(x + 2, y + 2, level.tilewidth - 4, level.tileheight - 4);
  
    const p = new Path2D(tile.d);

    // Save the current context state
    context.save();

    // Translate to the starting point (x + 2, y + 2)
    context.translate(x + 2, y + 2);
    

    // Calculate scaling factors based on the desired size
    const viewBox = tile.viewBox.split(" ");
    const viewBoxWidth = parseFloat(viewBox[2]);
    const viewBoxHeight = parseFloat(viewBox[3]);
    const scaleX = (level.tilewidth - 4) / viewBoxWidth;
    const scaleY = (level.tileheight - 4) / viewBoxHeight;

    // Scale the SVG to fit within the specified size
    context.scale(scaleX, scaleY);

    // Apply rotation if specified
    if (tile.transform) {
      const m = /rotate\(([-\d.]+)\)/.exec(tile.transform);
      if (m) {
        const angle = parseFloat(m[1]);
        // Translate to the center of the tile before rotating
        context.translate(viewBoxWidth / 2, viewBoxHeight / 2);
        context.rotate((angle * Math.PI) / 180);
        // Translate back after rotation
        context.translate(-viewBoxWidth / 2, -viewBoxHeight / 2);
      }
    }

    // Set fill and stroke styles
    context.fillStyle = tile.fill;
    context.fill(p);
    if (tile.stroke) {
      context.strokeStyle = tile.stroke;
      context.lineWidth = 1 / Math.min(scaleX, scaleY); // Adjust stroke width for scaling
      context.stroke(p);
    }

    // Restore the context state
    context.restore();
  }

  // Render clusters
  function renderClusters() {
    for (var i = 0; i < clusters.length; i++) {
      // Calculate the tile coordinates
      var coord = getTileCoordinate(clusters[i].column, clusters[i].row, 0, 0);
    }
  }

  // Render moves
  function renderMoves() {
    for (var i = 0; i < moves.length; i++) {
      // Calculate coordinates of tile 1 and 2
      var coord1 = getTileCoordinate(moves[i].column1, moves[i].row1, 0, 0);
      var coord2 = getTileCoordinate(moves[i].column2, moves[i].row2, 0, 0);

      // Draw a line from tile 1 to tile 2
      context.strokeStyle = "#ff0000";
      context.beginPath();
      context.moveTo(
        coord1.tilex + level.tilewidth / 2,
        coord1.tiley + level.tileheight / 2
      );
      context.lineTo(
        coord2.tilex + level.tilewidth / 2,
        coord2.tiley + level.tileheight / 2
      );
      context.stroke();
    }
  }

  // Start a new game
  function newGame() {
    // Reset score
    score = 0;

    // Set the gamestate to ready
    gamestate = gamestates.ready;

    // Reset game over
    gameover = false;

    // Reset turn to player
    isPlayerTurn = true;

    // Create the level
    createLevel();

    // Find initial clusters and moves
    findMoves();
    findClusters();
  }

  // Create a random level
  function createLevel() {
    var done = false;

    // Keep generating levels until it is correct
    while (!done) {
      // Create a level with random tiles
      for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows; j++) {
          level.tiles[i][j].type = getRandomTile();
        }
      }

      // Resolve the clusters
      resolveClusters();

      // Check if there are valid moves
      findMoves();

      // Done when there is a valid move
      if (moves.length > 0) {
        done = true;
      }
    }
  }

  // Get a random tile
  function getRandomTile() {
    return Math.floor(Math.random() * tileData.length);
  }

  // Remove clusters and insert tiles
  function resolveClusters() {
    // Check for clusters
    findClusters();

    // While there are clusters left
    while (clusters.length > 0) {
      // Remove clusters
      removeClusters();

      // Shift tiles
      shiftTiles();

      // Check if there are clusters left
      findClusters();
    }
  }

  // Find clusters in the level
  function findClusters() {
    // Reset clusters
    clusters = [];

    // Find horizontal clusters
    for (var j = 0; j < level.rows; j++) {
      // Start with a single tile, cluster of 1
      var matchlength = 1;
      for (var i = 0; i < level.columns; i++) {
        var checkcluster = false;

        if (i == level.columns - 1) {
          // Last tile
          checkcluster = true;
        } else {
          // Check the type of the next tile
          if (
            level.tiles[i][j].type == level.tiles[i + 1][j].type &&
            level.tiles[i][j].type != -1
          ) {
            // Same type as the previous tile, increase matchlength
            matchlength += 1;
          } else {
            // Different type
            checkcluster = true;
          }
        }

        // Check if there was a cluster
        if (checkcluster) {
          if (matchlength >= 3) {
            // Found a horizontal cluster
            clusters.push({
              column: i + 1 - matchlength,
              row: j,
              length: matchlength,
              horizontal: true,
              type: level.tiles[i][j].type,
            });
          }

          matchlength = 1;
        }
      }
    }

    // Find vertical clusters
    for (var i = 0; i < level.columns; i++) {
      // Start with a single tile, cluster of 1
      var matchlength = 1;
      for (var j = 0; j < level.rows; j++) {
        var checkcluster = false;

        if (j == level.rows - 1) {
          // Last tile
          checkcluster = true;
        } else {
          // Check the type of the next tile
          if (
            level.tiles[i][j].type == level.tiles[i][j + 1].type &&
            level.tiles[i][j].type != -1
          ) {
            // Same type as the previous tile, increase matchlength
            matchlength += 1;
          } else {
            // Different type
            checkcluster = true;
          }
        }

        // Check if there was a cluster
        if (checkcluster) {
          if (matchlength >= 3) {
            // Found a vertical cluster
            clusters.push({
              column: i,
              row: j + 1 - matchlength,
              length: matchlength,
              horizontal: false,
              type: level.tiles[i][j].type,
            });
          }

          matchlength = 1;
        }
      }
    }
  }

  // Find available moves
  function findMoves() {
    // Reset moves
    moves = [];

    // Check horizontal swaps
    for (var j = 0; j < level.rows; j++) {
      for (var i = 0; i < level.columns - 1; i++) {
        // Swap, find clusters and swap back
        swap(i, j, i + 1, j);
        findClusters();
        swap(i, j, i + 1, j);

        // Check if the swap made a cluster
        if (clusters.length > 0) {
          // Found a move
          moves.push({ column1: i, row1: j, column2: i + 1, row2: j });
        }
      }
    }

    // Check vertical swaps
    for (var i = 0; i < level.columns; i++) {
      for (var j = 0; j < level.rows - 1; j++) {
        // Swap, find clusters and swap back
        swap(i, j, i, j + 1);
        findClusters();
        swap(i, j, i, j + 1);

        // Check if the swap made a cluster
        if (clusters.length > 0) {
          // Found a move
          moves.push({ column1: i, row1: j, column2: i, row2: j + 1 });
        }
      }
    }

    // Reset clusters
    clusters = [];
  }

  // Loop over the cluster tiles and execute a function
  function loopClusters(func) {
    for (var i = 0; i < clusters.length; i++) {
      //  { column, row, length, horizontal }
      var cluster = clusters[i];
      var coffset = 0;
      var roffset = 0;
      for (var j = 0; j < cluster.length; j++) {
        func(i, cluster.column + coffset, cluster.row + roffset, cluster);

        if (cluster.horizontal) {
          coffset++;
        } else {
          roffset++;
        }
      }
    }
  }

  // Remove the clusters
  function removeClusters() {
    // Change the type of the tiles to -1, indicating a removed tile
    loopClusters(function (index, column, row, cluster) {
      level.tiles[column][row].type = -1;
    });

    // Calculate how much a tile should be shifted downwards
    for (var i = 0; i < level.columns; i++) {
      var shift = 0;
      for (var j = level.rows - 1; j >= 0; j--) {
        // Loop from bottom to top
        if (level.tiles[i][j].type == -1) {
          // Tile is removed, increase shift
          shift++;
          level.tiles[i][j].shift = 0;
        } else {
          // Set the shift
          level.tiles[i][j].shift = shift;
        }
      }
    }
  }

  // Shift tiles and insert new tiles
  function shiftTiles() {
    // Shift tiles
    for (var i = 0; i < level.columns; i++) {
      for (var j = level.rows - 1; j >= 0; j--) {
        // Loop from bottom to top
        if (level.tiles[i][j].type == -1) {
          // Insert new random tile
          level.tiles[i][j].type = getRandomTile();
        } else {
          // Swap tile to shift it
          var shift = level.tiles[i][j].shift;
          if (shift > 0) {
            swap(i, j, i, j + shift);
          }
        }

        // Reset shift
        level.tiles[i][j].shift = 0;
      }
    }
  }

  // Get the tile under the mouse
  function getMouseTile(pos) {
    // Calculate the index of the tile
    var tx = Math.floor((pos.x - level.x) / level.tilewidth);
    var ty = Math.floor((pos.y - level.y) / level.tileheight);

    // Check if the tile is valid
    if (tx >= 0 && tx < level.columns && ty >= 0 && ty < level.rows) {
      // Tile is valid
      return {
        valid: true,
        x: tx,
        y: ty,
      };
    }

    // No valid tile
    return {
      valid: false,
      x: 0,
      y: 0,
    };
  }

  // Check if two tiles can be swapped
  function canSwap(x1, y1, x2, y2) {
    // Check if the tile is a direct neighbor of the selected tile
    if (
      (Math.abs(x1 - x2) == 1 && y1 == y2) ||
      (Math.abs(y1 - y2) == 1 && x1 == x2)
    ) {
      return true;
    }

    return false;
  }

  // Swap two tiles in the level
  function swap(x1, y1, x2, y2) {
    var typeswap = level.tiles[x1][y1].type;
    level.tiles[x1][y1].type = level.tiles[x2][y2].type;
    level.tiles[x2][y2].type = typeswap;
  }

  // Swap two tiles as a player action
  function mouseSwap(c1, r1, c2, r2) {
    // Save the current move
    currentmove = { column1: c1, row1: r1, column2: c2, row2: r2 };

    // Deselect
    level.selectedtile.selected = false;

    // Start animation
    animationstate = 2;
    animationtime = 0;
    gamestate = gamestates.resolve;
    console.log(isPlayerTurn);
    isPlayerTurn = !isPlayerTurn;
  }

  // On mouse movement
  function onMouseMove(e) {
    // Get the mouse position
    var pos = getMousePos(canvas, e);

    // Check if we are dragging with a tile selected
    if (drag && level.selectedtile.selected) {
      // Get the tile under the mouse
      let mt = getMouseTile(pos);
      if (mt.valid) {
        // Valid tile

        // Check if the tiles can be swapped
        if (
          canSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row)
        ) {
          // Swap the tiles
          mouseSwap(
            mt.x,
            mt.y,
            level.selectedtile.column,
            level.selectedtile.row
          );
        }
      }
    }
  }

  // On mouse button click
  function onMouseDown(e) {
    // Get the mouse position
    var pos = getMousePos(canvas, e);

    // Start dragging
    if (!drag) {
      // Get the tile under the mouse
      let mt = getMouseTile(pos);

      if (mt.valid) {
        // Valid tile
        var swapped = false;
        if (level.selectedtile.selected) {
          if (
            mt.x == level.selectedtile.column &&
            mt.y == level.selectedtile.row
          ) {
            // Same tile selected, deselect
            level.selectedtile.selected = false;
            drag = true;
            return;
          } else if (
            canSwap(
              mt.x,
              mt.y,
              level.selectedtile.column,
              level.selectedtile.row
            )
          ) {
            // Tiles can be swapped, swap the tiles
            mouseSwap(
              mt.x,
              mt.y,
              level.selectedtile.column,
              level.selectedtile.row
            );
            swapped = true;
          }
        }

        if (!swapped) {
          // Set the new selected tile
          level.selectedtile.column = mt.x;
          level.selectedtile.row = mt.y;
          level.selectedtile.selected = true;
        }
      } else {
        // Invalid tile
        level.selectedtile.selected = false;
      }

      // Start dragging
      drag = true;
    }
  }

  function onMouseUp(e) {
    // Reset dragging
    drag = false;
  }

  function onMouseOut(e) {
    // Reset dragging
    drag = false;
  }

  // Get the mouse position
  function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: Math.round(
        ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
      ),
      y: Math.round(
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
      ),
    };
  }

  // Call init to start the game
  init();
}

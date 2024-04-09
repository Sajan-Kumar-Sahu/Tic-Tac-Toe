import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Snackbar from 'react-native-snackbar';

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [gameWinner, setGameWinner] = useState('');
  const [gameState, setGameState] = useState(new Array(9).fill('', 0, 9));

  const resetGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('', 0, 9));
  };

  const checkWinner = () => {
    if (
      gameState[0] !== '' &&
      gameState[0] === gameState[1] &&  // row1
      gameState[1] === gameState[2]
    ) {
      setGameWinner(`${gameState[0]} is the winner`);
    } else if (
      gameState[3] !== '' &&
      gameState[3] === gameState[4] &&  // row2
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} is the winner`);
    } else if (
      gameState[6] !== '' &&
      gameState[6] === gameState[7] &&  // row3
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} is the winner`);
    } else if (
      gameState[0] !== '' &&
      gameState[0] === gameState[3] &&  // column1
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} is the winner`);
    } else if (
      gameState[1] !== '' &&
      gameState[1] === gameState[4] &&  // column2
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} is the winner`);
    } else if (
      gameState[2] !== '' &&
      gameState[2] === gameState[5] &&  // column3
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} is the winner`);
    } else if (
      gameState[0] !== '' &&
      gameState[0] === gameState[4] && // left digonal
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} is the winner`);
    } else if (
      gameState[2] !== '' &&
      gameState[2] === gameState[4] &&  // right digonal
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} is the winner`);
    } else if(!gameState.includes('',0)){
      setGameWinner('Match is Draw');
    }
  };
  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#22333B',
        textColor: '#C6AC8F',
        duration: Snackbar.LENGTH_LONG,
      });
    }
    if (gameState[itemNumber] === '') {
      gameState[itemNumber] = isCross ? 'X' : 'O';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position Already filled',
        backgroundColor: '#22333B',
        textColor: '#C6AC8F',
      });
    }
    checkWinner();
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Tic-Tac-Toe</Text>
      </View>
      {gameWinner ? (
        <View style={styles.playerInfo}>
          <Text style={styles.winnerText}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={styles.playerInfo}>
          <Text style={isCross ? styles.playerX : styles.playerO}>
            Player {isCross ? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}
      <View style={styles.gameContainer}>
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            style={styles.card}
            key={index}
            onPress={() => onChangeItem(index)}>
              <Text style={{fontSize:30,color:'#EAE0D5',fontWeight:'bold'}}>{gameState[index]}</Text>
            </Pressable>
        )}
        
      />
      </View>
      <Pressable
        onPress={()=>resetGame()}
        style={styles.newGameBtn}
      >
        <Text style={styles.newBtnText}>{gameWinner ? 'New Game' : 'Reset Game'}</Text>
      </Pressable>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAE0D5',
  },
  titleContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#4A5759',
    borderRadius: 15,
    backgroundColor: '#C6AC8F',
    elevation:5
  },
  titleText: {
    fontSize: 50,
    fontWeight: '800',
    color: '#22333B',
  },
  winnerText: {
    fontSize: 20,
    color: '#22333B',
    fontWeight: 'bold',
  },
  playerInfo: {
    borderWidth: 2,
    alignItems: 'center',
    marginHorizontal: 100,
    borderRadius: 15,
    padding: 10,
    borderColor: '#4A5759',
    marginVertical: 20,
    backgroundColor:'#C6AC8F',
    elevation:5
  },
  playerX: {
    fontSize: 20,
    color: '#22333B',
    fontWeight: 'bold',
  },
  playerO: {
    fontSize: 20,
    color: '#22333B',
    fontWeight: 'bold',
  },
  gameContainer: {
    alignItems:'center',
    marginBottom:20,
  },
  card: {
    borderColor:'#C6AC8F',
    borderWidth:3,
    backgroundColor: '#22333B',
    padding: 40,
    margin: 5,
    elevation:3,
    width:110,
    borderRadius:10
  },
  grid:{
    margin:15
  },
  newGameBtn:{
    borderWidth:2,
    borderRadius:15,
    alignItems:'center',
    padding:10,
    marginHorizontal:120,
    backgroundColor:'#C6AC8F'
  },
  newBtnText:{
    fontSize:20,
    fontWeight:'bold',
    color:'#22333B'
  }
});

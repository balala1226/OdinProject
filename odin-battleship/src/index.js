import './style/style.css'
const BattleshipGame = require('./script/battleshipGame')
import { DisplayController } from './script/ui/displayController';

const newBattleshipGame = new BattleshipGame();
const displayController = new DisplayController(newBattleshipGame);
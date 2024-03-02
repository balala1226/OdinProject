import '../style/Header.css'

function Header() {
  return (
    <>
      <header>
        <div className='headerContent'>
            <h1>Memory Game</h1>
        </div>
        <div className='headerContent'>
            <p className='gameDescription'>Select a card you have not chosen within the time limit. </p>
        </div>
      </header>
    </>
  )
}

export default Header

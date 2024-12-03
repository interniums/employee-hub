import styled from 'styled-components'
import hub from '/assets/hub.svg'
import hamburger from '/assets/hamburger-menu.svg'
import { useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import { toggleNav } from '../store/nav.store'

function Header() {
  const location = useLocation()
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    console.log(location.pathname)
    if (location.pathname === '/notes') {
      setShowNav(true)
    } else {
      setShowNav(false)
    }
  }, [location])
  return (
    <StyledHeader $showNav={showNav}>
      {showNav ? (
        <>
          <StyledHamburgerContainer onClick={() => toggleNav()}>
            <StyledHamburger src={hamburger}></StyledHamburger>
          </StyledHamburgerContainer>
          <StyledPathname>{location.pathname}</StyledPathname>
        </>
      ) : (
        <StyledImg src={hub} alt="hub-img"></StyledImg>
      )}
    </StyledHeader>
  )
}

const StyledPathname = styled.div`
  font-size: 2rem;
  font-weight: 700;
`

const StyledHamburgerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 25%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
const StyledHamburger = styled.img`
  width: 3rem;
  height: 3rem;
`
const StyledHeader = styled.header<{ $showNav: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  justify-content: ${(props) => (props.$showNav ? 'space-between' : 'center')};
`
const StyledImg = styled.img`
  width: 5rem;
  height: 5rem;
`

export default Header

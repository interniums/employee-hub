import styled from 'styled-components'
import hub from '/assets/hub.svg'

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0rem;
`

const StyledImg = styled.img`
  width: 5rem;
  height: 5rem;
`

export default function Header() {
  return (
    <StyledHeader>
      <StyledImg src={hub} alt="hub-img"></StyledImg>
    </StyledHeader>
  )
}

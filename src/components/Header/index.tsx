import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HearderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HearderProps) {

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dtmoney" />
                <button type="button" onClick={onOpenNewTransactionModal}>Nova Transação</button>

            </Content>
        </Container>
    )
}
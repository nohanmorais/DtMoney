import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';
import { FormEvent, useContext, useState } from 'react';
import { api } from '../../services/api';
import { useTransactions } from '../../Hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransactionModal({ isOpen, onRequestClose}: NewTransactionModalProps) {
    
    const { createTransaction } = useTransactions();

    const [ type, setType ] = useState('deposit');
    const [ title, setTitle ] = useState('');
    const [ value, setValue ] = useState(0);
    const [ category, setCategory ] = useState('');


    async function handleCreateNewTransaction(event: FormEvent) {
        
        //Previne o carregamento da pagina ao enviar form
        event.preventDefault();
        
        await createTransaction({
            title,
            amount: value,
            category,
            type,
        })

        setTitle('')
        setValue(0)
        setCategory('')
        setType('deposit')
        onRequestClose();
       
    }

    return (
        <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal"></img>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Nova Operacao</h2>

            <input 
            placeholder='Titulo'
            value={title}
            onChange={event => setTitle(event.target.value)}
            ></input>

            <input 
            type='number' 
            placeholder='Valor'
            value={value}
            onChange={event => setValue(Number(event.target.value))}            
            ></input>

            <TransactionTypeContainer>
                
                <RadioBox 
                    type='button' 
                    onClick={() => { setType('deposit'); } }
                    isActive={type === 'deposit'}
                    activeColor="green"
                >
                    <img src={incomeImg} alt='Entrada'/>
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox 
                    type='button' 
                    onClick={() => { setType('withdraw'); } }
                    isActive={type === 'withdraw'}
                    activeColor="red"

                >
                    <img src={outcomeImg} alt='Saida'/>
                    <span>Saida</span>
                </RadioBox>

            </TransactionTypeContainer>

            <input 
                placeholder='Categoria'
                value={category}
                onChange={event => setCategory(event.target.value)}   
            ></input>

            <button type='submit'>Cadastrar</button>
            </Container>
        </Modal>
    )

}
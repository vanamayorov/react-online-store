import styled from 'styled-components';
import { IoIosCloseCircleOutline } from "react-icons/io";

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    pointer-events: all;
    z-index: 999;
    background-color: rgba(0,0,0,.5);
`;

const ModalContent = styled.div`
position: relative;
    max-width: 650px;
    width: 100%;
    min-height: 250px;
    overflow: auto;
    background-color: white;
    border-radius: 10px;
    padding: 15px;

    @media(max-width: 676px) {
        max-width: 450px;
        min-height: 220px;
    }

    @media(max-width: 490px) {
        max-width: 280px;
    }
`;

const ModalTop = styled.div`
    font-size: 24px;
    margin-bottom: 25px;
    text-align: center;

    @media(max-width: 676px) {
        font-size: 18px;
        margin-bottom: 15px;
    }

    @media(max-width: 490px) {
        font-size: 16px;
        margin-bottom: 15px;
    }
`;

const CloseBtn = styled.button.attrs(props => ({
    type: 'button'
}))`
    position: absolute;
    top: 10px;
    right: 15px;
    background: transparent;
    border: none;
    padding: 0;

    @media(max-width: 490px) {
        top: 0px;
        right: 0px;
        & svg {
            width: 24px;
            height: 24px;
        }
    }
`;

const ModalBody = styled.div`
    height: 100%; 
`;

const ModalWrapper = ({ open, closeModal, title, children }) => {
    return (
        open &&
        <Wrapper onClick={closeModal}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalTop>
                    {title}
                    <CloseBtn onClick={closeModal}>
                        <IoIosCloseCircleOutline size="30px" />
                    </CloseBtn>
                </ModalTop>

                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Wrapper>
    )
}

export { ModalWrapper };
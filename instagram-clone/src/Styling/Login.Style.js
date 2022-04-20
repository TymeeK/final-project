import styled from 'styled-components';

export const MainContainer = styled.main`
    background-color: #fafafa;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const H1 = styled.h1`
    margin: 0px;
    padding: 0px;
`;

export const FieldLabel = styled.label`
    display: block;
    padding-bottom: 4px;
`;

export const InputField = styled.input`
    margin-bottom: 10px;
`;

export const FormFieldContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    outline: 1px solid lightgrey;
    padding: 20px;
`;

export const LoginButton = styled.button`
    width: 250px;
    height: 30px;
    font-size: 15px;
    border-radius: 5px;
    background-color: rgba(0, 149, 246, 0.3);
    margin-bottom: 25px;
    margin-top: 15px;
    &:hover {
        cursor: pointer;
        background-color: #0095f6;
    }
`;

export const Line = styled.div`
    border-bottom: 1px solid lightgray;
    height: 1px;
    width: 250px;
`;

import styled from 'styled-components';

export const ProfileDiv = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    /* background-color: red; */
    padding-bottom: 20px;
    padding-top: 20px;
    border-bottom: 1px solid gray;
`;

export const ProfilePic = styled.img`
    border-radius: 50%;
    max-width: 100px;
    max-height: 100px;
    margin-right: 20px;
`;

export const ProfileName = styled.h3`
    display: block;
`;

export const ProfileUpload = styled.button`
    &:hover {
        cursor: pointer;
    }
`;

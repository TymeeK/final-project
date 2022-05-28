import styled from 'styled-components';

export const ProfileDiv = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    /* background-color: red; */
    padding-bottom: 20px;
    padding-top: 60px;
    margin-top: 10px;
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

export const ProfilePostContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
`;
export const PostContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 65%;
    height: 100%;
    margin-top: 20px;
`;

export const Post = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 350px;
`;

export const PostImage = styled.img`
    max-width: 200px;
    max-height: 200px;

    &:hover {
        cursor: pointer;
    }
`;

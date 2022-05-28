import styled from 'styled-components';

export const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 10px;
    background-color: #fff;
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PostContainer = styled.div`
    /* outline: 1px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 900px;
    height: 700px;
`;
export const ImageDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 500px;
    margin-top: 30px;
    outline: 1px solid black;
`;

export const FeedImage = styled.img`
    /* object-fit: cover; */
    min-width: 100%;
    min-height: 100%;
`;

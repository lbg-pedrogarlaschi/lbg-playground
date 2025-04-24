import React from 'react';
import styled from 'styled-components/native';

export enum TileLayout {
    Single = "Single",
    Double = "Double",
}

export enum TilePreset {
    LinkOnly = "LinkOnly",
    LinkDescription = "LinkDescription",
    HeadingDescription = "HeadingDescription"
}

export enum TileState {
    Default = "Default",
    Pressed = "Pressed"
}

const Wrapper = styled.View`
    
    width: ${props => getWidth(props)};
    height: ${props => getHeight(props)};
    background-color:${props => `${props.theme['--BackgroundPanelDefault']}`};    
    border-radius: ${props => `${props.theme['--ComponentTempTileCornerRadius']}px`};
    padding:${props => `${props.theme['--SpacingSize16']}px`};
    flex-direction:${props => getFlexDirection(props)};
    align-items:center;
    justify-content: space-around;
    
`

const TextWrapper = styled.View`

    width: 70%;
    justify-items: center;

`

const Icon = styled.Image`

width: 40px;
height: 40px;
    

`

const Description = styled.Text`

    color: ${props => `${props.theme['--TextGenericSubdued']}`};    
    font-family: ${props => `${props.theme['--TypesStyle6Max135FontFamily']}`};    
    font-size:${props => `${props.theme['--TypesStyle6Max135FontSize']}`};
`

const Link = styled.Text`
    
    font-weight: 700;
    color: ${props => `${props.theme['--TextActionDefault']}`};    
    font-family: ${props => `${props.theme['--TypesStyle7Max135FontFamily']}`};    
    font-size:${props => `${props.theme['--TypesStyle7Max135FontSize']}`};
    
`

const getFlexDirection = ({layout})=>{

    switch(layout)
    {
        case TileLayout.Single:
            return 'row'
        case TileLayout.Double:
            return 'column'
    }
}


const getWidth = ({layout})=>{

    switch(layout)
    {
        case TileLayout.Single:
            return '343px'
        case TileLayout.Double:
            return '163px'
    }
}

const getHeight = ({layout})=>{

    switch(layout)
    {
        case TileLayout.Single:
            return '72px'
        case TileLayout.Double:
            return '100px'
    }
}

export interface TileProps {
    
    onClick?: () => void;
    layout?: TileLayout;
    preset?: TilePreset;
    icon?: any;
    description?:string;
    link?:string;
}

const Tile : React.FC<TileProps> = ({onClick , layout = TileLayout.Single , preset , description , link , icon })=>{
    return (
        <Wrapper layout={layout}>
            <Icon source={icon}/>
            <TextWrapper>
                <Description>{description}</Description>
                <Link>{link}</Link>
            </TextWrapper>
        </Wrapper>
    )
}


export default Tile;
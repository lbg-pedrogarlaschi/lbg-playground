import React, { ReactNode, useState } from "react";
import styled from "styled-components/native";
import ButtonType from "./ButtonType";
import Icons from "./Icons";


export const Wrapper = styled.View<{ type: ButtonType, pressed: boolean, brandAccent: boolean, disabled: boolean , size:string }>`
    height: ${props => getButtonSize(props)}px;
    width: ${props => getButtonSize(props)}px;
    
    max-width: 375px;
    justify-content: center;
    min-height: ${props => `${props.theme['--OSHittargetareaDefault']}px`};
    max-height: ${props => `${props.theme['--OSHittargetareaDefault']}px`};
    border-radius: 50%;
    border-color: ${props => `${props.theme['--BorderActionDefault']}`};
    border-width: ${props => getBorderWidth(props)};
    background-color: ${props => getBackgroundColor(props)};
`;


const PressableWrapper = styled.Pressable`
    width: 100%;
    height: 100%;
    
    align-items: center;
    flex-direction: row;
    padding: 0 10px;
`;

const Icon = styled.Image`
    width: 24px;
    height: 24px;
    margin-left: auto;
`;


export interface IconButtonProps
{
    onClick?: () => void;
    type?: ButtonType;
    brandAccent?: boolean;
    disabled?: boolean;
}


const IconButton: React.FC<IconButtonProps> = ({ onClick, type = ButtonType.Primary, brandAccent = false, disabled = false }) => {
    
    const [pressed, setPressed] = useState(false);
    const handlePressIn = () => setPressed(true);
    const handlePressOut = () => setPressed(false);
    const handlePress = () => {
        if (onClick) onClick();
    };

    const getChevronIcon = ()=>{

        if(disabled)
            return Icons.chevron_right_light;

        switch(type)
        {
            case ButtonType.Primary:
                return Icons.chevron_right_light;;
            case ButtonType.Secondary:
                if(pressed)
                    return Icons.chevron_right_light;
                else
                    return Icons.chevron_right_dark;
            case ButtonType.Tertiary:
                if(pressed)
                    return Icons.chevron_right_light;
                else
                    return Icons.chevron_right_dark;
        }
    }

    return (
        <Wrapper type={type} brandAccent={brandAccent} disabled={disabled} pressed={pressed}>
            <PressableWrapper onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <Icon source={getChevronIcon()} />
            </PressableWrapper>
        </Wrapper>
    )
};


const getButtonSize = ({ size }) => {
   
    switch(size)
    {
        case 'small':
            return 38;
        default:
            return 48;
    }
};


const getBorderWidth = ({ type, brandAccent, disabled, theme }) => {
    if (brandAccent || disabled) return '0px';
    switch (type) {
        case ButtonType.Primary:
        case ButtonType.Secondary:
            return `${theme['--ComponentActionButtonBorderWidth']}px`;
        case ButtonType.Tertiary:
            return '0px';
        default:
            return `${theme['--ComponentActionButtonBorderWidth']}px`;
    }
};

const getBackgroundColor = ({ type, pressed, brandAccent, disabled, theme }) => {
    if (disabled) return theme['--BackgroundActionDisabled'];
    if (brandAccent) return pressed ? theme['--ComponentBrandAccentButtonPrimaryBackgroundPressed'] : theme['--ComponentBrandAccentButtonPrimaryBackgroundDefault'];
    if (pressed) return theme['--BackgroundActionPressed'];
    switch (type) {
        case ButtonType.Primary:
            return theme['--BackgroundActionDefault'];
        case ButtonType.Secondary:
        case ButtonType.Tertiary:
            return theme['--BackgroundActionDefaultAlt01'];
        default:
            return theme['--BackgroundActionDefault'];
    }
};

export default IconButton;
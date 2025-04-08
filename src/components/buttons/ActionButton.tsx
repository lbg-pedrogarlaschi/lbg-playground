import React, { ReactNode, useState } from "react";
import styled from "styled-components/native";
import { useFonts } from 'expo-font';
import ButtonType from "./ButtonType";

import Icons from "../assets/Icons";

export const Wrapper = styled.View<{ type: ButtonType, pressed: boolean, brandAccent: boolean, disabled: boolean }>`
    width: 100%;
    max-width: 375px;
    justify-content: center;
    min-height: ${props => `${props.theme['--OSHittargetareaDefault']}px`};
    max-height: ${props => `${props.theme['--OSHittargetareaDefault']}px`};
    border-radius: ${props => `${props.theme['--ComponentActionButtonDefaultCornerRadius']}px`};
    border-color: ${props => `${props.theme['--BorderActionDefault']}`};
    border-width: ${props => getBorderWidth(props)};
    background-color: ${props => getBackgroundColor(props)};
`;

const Label = styled.Text<{ type: ButtonType, pressed: boolean, disabled: boolean }>`
    flex: 1;
    text-align: center;
    color: ${props => getTextColor(props)};
    font-family: ${props => props.theme['--TypesStyle4Max135FontFamily']};
    font-size:  ${props => `${props.theme['--TypesStyle4Max135FontSize']}px`};
    text-decoration: ${props => getTextDecoration(props)};
    font-weight: 700;
`;

const ActionButtonIcon = styled.Image<{ icon: boolean }>`
    width: 24px;
    height: 24px;
    opacity: ${({ icon }) => icon ? '100' : '0'};
    margin-left: 10px;
    padding: 3px;
    margin-left: auto;
`;

const PressableWrapper = styled.Pressable`
    width: 100%;
    height: 100%;
    
    align-items: center;
    flex-direction: row;
    padding: 0 10px;
`;

export interface ActionButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: ButtonType;
    brandAccent?: boolean;
    icon?: boolean;
    disabled?: boolean;
    iconRight?:boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick, type = ButtonType.Primary, brandAccent = false, icon = false, disabled = false , iconRight = true }) => {


    const [fontsLoaded] = useFonts({
        'GT-Ultra': require('../../../assets/fonts/GT-Ultra-Median-Bold.ttf'),
    });

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
                return Icons.chevron_right_light;
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
        <Wrapper type={type} pressed={pressed} brandAccent={brandAccent} disabled={disabled}>
            <PressableWrapper onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <ActionButtonIcon source={getChevronIcon()} icon={(icon && !iconRight)} />
                <Label type={type} pressed={pressed} disabled={disabled} brandAccent={brandAccent}>{children}</Label>
                <ActionButtonIcon source={getChevronIcon()} icon={(icon && iconRight)} />
            </PressableWrapper>
        </Wrapper>
    );
};

const getBorderWidth = ({ type, brandAccent, disabled, theme }) => {
    if (brandAccent || disabled) return '0px';

    switch (type) {
        case ButtonType.Primary:
            return '0px';
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

const getTextColor = ({ type, pressed, disabled, theme }) => {
    if (disabled) return theme['--TextActionDisabled'];
    if (pressed) return theme['--TextActionPressedAlt01'];
    switch (type) {
        case ButtonType.Primary:
            return theme['--TextActionInverseAlt01'];
        case ButtonType.Secondary:
        case ButtonType.Tertiary:
            return theme['--TextActionDefault'];
        default:
            return theme['--TextActionInverseAlt01'];
    }
};

const getTextDecoration = ({ type,brandAccent }) => {

    if (brandAccent) return 'none';
    switch (type) {
        case ButtonType.Tertiary:
            return 'underline';
        default:
            return 'none';
    }
};


export default ActionButton;
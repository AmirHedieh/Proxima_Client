import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { FlatList, Image, View } from 'react-native'
import { NavigationActions } from '../../NavigationActions'
import { Localization } from '../../text_process/Localization'
import { BaseScene } from '../base_scene/BaseScene'
import { expandingTabCollapsedHeight, expandingTabExpandedHeight, Styles } from './CommentsSceneStyles'
import { HttpManager } from '../../network/HttpManager'
import { Comment } from '../../models/Comment'
import { CommentCard } from '../../RFC/CommentCard/CommentCard'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { AppInfoTab } from '../../components/app_info_tab/AppInfoTab'
import { BaseText } from '../../components/base_text/BaseText'
import { CommonValidator } from '../../utils/Validator'
import { LabeledEditText } from '../../components/labeled_edit_text/LabeledEditText'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Dimension } from '../../GlobalStyles'
import { Colors } from '../../Constants'
import * as Animatable from 'react-native-animatable'
import { DomainViewModel } from '../../classes/DomainViewModel'

export interface ICommentsSceneProps {
    museumId: number,
    productId: number,
    AppState?: DomainViewModel
}
interface IState {
    comments: Comment[]
    commentorError: string
    textError: string
    isTabExpanded: boolean
}
@inject('AppState')
@observer
export class CommentsScene extends BaseScene<ICommentsSceneProps, IState> {
    private productsTabRef = null
    private flatListRef = null
    private commentorEditTextRef: LabeledEditText = null
    private textEditTextRef: LabeledEditText = null

    public state: IState = {
        comments: [],
        commentorError: '',
        textError: '',
        isTabExpanded: false,
    }
    
    protected async sceneDidMount(): Promise<void> {
        await this.getComments()
    }

    protected async sceneWillUnmount(): Promise<void> {
        await this.props.AppState.startDetecting()
    }

    protected renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                <View style={Styles.flatListContainer}>
                    {this.renderComments()}
                </View>
                <AppInfoTab title={Localization.translate('tabTitleCommentsScene')}/>
                {this.renderProductsExpandingTabBackground()}
            </View>
        )
    }

    private renderProductsExpandingTabBackground(): JSX.Element {
        return (
            <Animatable.View
            ref={(ref) => (this.productsTabRef = ref)}
            useNativeDriver={true}
            style={Styles.productsTabContainer}
        >
            <SafeTouch
                style={[
                    Styles.productsTabSafeTouch,
                    this.state.isTabExpanded
                        ? Styles.productsTabSafeTouchExpanded
                        : Styles.productsTabSafeTouchCollapsed
                ]}
                onPress={this.onLeaveCommentTabPress}
            >
                {this.state.isTabExpanded ? (
                    <Image
                        style={{ transform: [{ rotate: '180deg' }] }}
                        source={require('../../resources/images/arrow_up.png')}
                    />
                ) : (
                    <BaseText
                        style={Styles.expandingTabCollapsedTitle}
                        text={Localization.translate('createCommentCommentsScene')}
                    />
                )}
            </SafeTouch>
            {this.renderCreateCommentSection()}
        </Animatable.View>
        )
    }

    private renderCreateCommentSection = () => {
        return (
            <View style={Styles.BottomContainer}>
                <RTLAwareView>
                    <SafeTouch
                    onPress={() => this.onSubmitCommentPress()}
                    style={Styles.submitCommentButton}
                    >
                        <MaterialIcon
                            name='send'
                            size={32 * Dimension.scaleX}
                            color={Colors.creamDark}
                        />
                    </SafeTouch>
                    <View style={Styles.bottomContainerDivider}/>
                    <View style={Styles.editTextsContainer}>
                        <LabeledEditText
                            style={Styles.commentorEditText}
                            innerContainerStyle={Styles.commentorEditTextInnerContainer}
                            ref={(ref) => (this.commentorEditTextRef = ref)}
                            placeHolder={Localization.translate('commentorPlaceHolderCommentCommentsScene')}
                            labelText={Localization.translate('commentorCommentCommentsScene')}
                            errorText={this.state.commentorError}
                            maxLength={32}
                        />
                        <LabeledEditText
                            style={Styles.textEditText}
                            innerContainerStyle={Styles.textEditTextInnerContainer}
                            editTextStyle={Styles.textEditText2}
                            ref={(ref) => (this.textEditTextRef = ref)}
                            multiline={true}
                            placeHolder={Localization.translate('textPlaceHolderCommentCommentsScene')}
                            labelText={Localization.translate('textCommentsScene')}
                            errorText={this.state.textError}
                            maxLength={320}
                        />
                    </View>
                </RTLAwareView>
            </View>
        )
    }

    private onLeaveCommentTabPress = () => {
        this.setState(
            {
                isTabExpanded: !this.state.isTabExpanded
            },
            () => {
                this.productsTabRef.animate({
                    0: {
                        translateY: this.state.isTabExpanded
                            ? expandingTabExpandedHeight - expandingTabCollapsedHeight
                            : 0
                    },
                    1: {
                        translateY: this.state.isTabExpanded
                            ? 0
                            : expandingTabExpandedHeight - expandingTabCollapsedHeight
                    }
                })
            }
        )
    }

    private onSubmitCommentPress = async () => {
        console.log('innnnn')
        if (this.validateData() === false) {
            return
        }
        await this.createComment()
    }

    private validateData(): boolean {
        let isValid: boolean = true
    
        let commentorError: string = ''
        let textError: string = ''

        if (CommonValidator.isNullOrEmpty(this.commentorEditTextRef.getEditTextRef().getStandardText())) {
            isValid = false
            commentorError = Localization.translate('invalid')
        }
        if (CommonValidator.isNullOrEmpty(this.textEditTextRef.getEditTextRef().getStandardText())) {
            isValid = false
            textError = Localization.translate('invalid')
        }
        console.log(commentorError, textError)
        this.setState({
            commentorError,
            textError,
        })

        return isValid
    }

    private renderComment = (event: { item: Comment; index: number }) => {
        return <CommentCard
                commentor={event.item.commentor}
                text={event.item.text}
            />
    }

    private renderComments = (): JSX.Element => {
        if (!CommonValidator.isEmptyArray(this.state.comments)) {
            return (
                <FlatList
                    ref={(ref) => this.flatListRef = ref}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={Styles.flatList}
                    keyExtractor={Comment.keyExtractor}
                    data={this.state.comments}
                    renderItem={this.renderComment}
                    // onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.2}
                />
            )
        }
        return <BaseText style={Styles.noCommentText} text={Localization.translate('noCommentCommentsScene')}/>
    }

    private onSuccess = async () => {
        await this.getComments()
    }

    private createComment = async () => {
        try {
            this.loadingDialog.show()
            const response = await HttpManager.getInstance().createComment({
                museumId: this.props.museumId,
                productId: this.props.productId
            }, {
                commentor: this.commentorEditTextRef.getEditTextRef().getStandardText(),
                text: this.textEditTextRef.getEditTextRef().getStandardText(),
            })
            this.loadingDialog.hide()
            if (response.isSuccessful()) {
                this.onLeaveCommentTabPress()
                this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
                this.commentorEditTextRef.getEditTextRef().setStateText('')
                this.textEditTextRef.getEditTextRef().setStateText('')
                this.okDialog.show({
                    title: Localization.translate('success'),
                    message: Localization.translate('successCreateCommentCommentsScene'),
                    onDismiss: this.onSuccess,
                    onOkButtonPressedCallback: this.onSuccess
                })
            } else {
                this.okDialog.show({
                    title: Localization.translate('error'),
                    message: response.getMessage(),
                })
            }
        } catch (e) {
            this.loadingDialog.hide()
            this.okDialog.show({
                title: Localization.translate('error'),
                message: e.message,
            })
        }
    }

    private getComments = async () => {
        try {
            this.loadingDialog.show()
            const response = await HttpManager.getInstance().getComments({
                // museumId: this.props.museumId,
                // productId: this.props.productId
                museumId: 1,
                productId: 4
            })
            console.log(response)
            this.loadingDialog.hide()
            if (response.isSuccessful()) {
                const comments: Comment[] = []
                for (const element of response.getData()) {
                    comments.push(new Comment(element))
                }
                this.setState({comments})
            }
            else {
                this.okDialog.show({
                    title: Localization.translate('error'),
                    message: response.getMessage()
                })
            }
        } catch (e) {
            this.loadingDialog.hide()
            this.okDialog.show({
                title: Localization.translate('error'),
                message: e.message,
                // onDismiss: () => NavigationActions.pop(),
                // onOkButtonPressedCallback: () => NavigationActions.pop()
            })
        }
    }

    protected onBackPress(): void {
        NavigationActions.pop()
    }
}

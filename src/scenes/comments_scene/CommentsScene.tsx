import * as React from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { NavigationActions } from '../../NavigationActions'
import { Localization } from '../../text_process/Localization'
import { BaseScene } from '../base_scene/BaseScene'
import { Styles } from './CommentsSceneStyles'
import { HttpManager } from '../../network/HttpManager'
import { Comment } from '../../models/Comment'
import { CommentCard } from '../../RFC/CommentCard/CommentCard'
import { AppInfoTab } from '../../components/app_info_tab/AppInfoTab'
import { BaseText } from '../../components/base_text/BaseText'
import { CommonValidator } from '../../utils/Validator'

export interface ICommentsSceneProps {
    museumId: number,
    productId: number
}
interface IState {
    comments: Comment[]
}
export class CommentsScene extends BaseScene<ICommentsSceneProps, IState> {
    public state: IState = {
        comments: []
    }
    
    public async componentDidMount(): Promise<void> {
        await this.getComments()
    }

    protected renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                <View style={Styles.flatListContainer}>
                    {this.renderComments()}
                </View>
                <AppInfoTab title={Localization.translate('tabTitleCommentsScene')}/>
            </View>
        )
    }

    private renderComment = (event: { item: Comment; index: number }) => {
        return <CommentCard
                commentor={event.item.commentor}
                text={event.item.text}
                onPress={() => this.yesNoDialog.show({
                    title: Localization.translate('deleteCommentDialogTitle'),
                    message: Localization.translate('deleteCommentDialogMessage'),
                    yesButtonText: Localization.translate('yes'),
                    noButtonText: Localization.translate('no'),
                    onYesButtonPressedCallback: () => this.removeComment(event.item.id)
                })}
            />
    }

    private renderComments = (): JSX.Element => {
        if (!CommonValidator.isEmptyArray(this.state.comments)) {
            return (
                <FlatList
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

    private getComments = async () => {
        try {
            this.loadingDialog.show()
            const response = await HttpManager.getInstance().getComments({
                museumId: this.props.museumId,
                productId: this.props.productId
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

    private removeComment = async (commentId: number) => {
        try {
            this.loadingDialog.show()
            const response = await HttpManager.getInstance().deleteComment({
                museumId: this.props.museumId,
                productId: this.props.productId,
                commentId
            })
            console.log(response)
            this.loadingDialog.hide()
            if (response.isSuccessful()) {
                this.getComments()
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
                onDismiss: () => NavigationActions.pop(),
                onOkButtonPressedCallback: () => NavigationActions.pop()
            })
        }
    }

    protected onBackPress(): void {
        NavigationActions.pop()
    }
}

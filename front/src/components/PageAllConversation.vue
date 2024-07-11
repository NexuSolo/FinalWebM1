<template>
    <div class="boxAll">
        <div class="listeConversations">
            <div class="conversations" v-for="(conversation, index) in conversations" :key="index">
                <div class="nomConversation" @click=chooseConversation(conversation) v-if="conversation.users.length > 1">
                    {{ this.getUsername(conversation) }}
                </div>
            </div>
            <div class="nomConversation" @click=goToNew()>
                +
            </div>

        </div>
        <div class="conv">

            <h1 class="otherUser">{{ otherUser.username }}</h1>


            <div class="conversation">


                <div class="messages" v-for="(message, index) in reversedMessages" :key="index">

                    <div class="messageRight" v-if="message.authorId == this.userId">
                        {{ message.text }}
                    </div>

                    <div class="messageLeft" v-else>
                        {{ message.text }}
                    </div>

                </div>


            </div>
            <div class="inputMessage">
                <form @submit.prevent="addMessage">
                    <input type="text" v-model="newMessage" placeholder="Écrire un message...">
                    <button class="sendMessage" type="submit"><img class="send_img" src="../assets/send.png"
                            alt=""></button>
                </form>
            </div>
        </div>
    </div>

    <BoutonDeco />

</template>

<script>
import gql from 'graphql-tag';
import { io } from "socket.io-client";
import BoutonDeco from './BoutonDeco.vue';

export default {
    components: {
        BoutonDeco
    },
    data() {
        return {
            userId: '',
            newMessage: '',
            conversations: [],
            messages: [],
            otherUser: '',
            currentConversationId: '',
            socket: null,
        };
    },
    computed: {
        reversedMessages() {
            return [...this.messages].reverse();
        }
    },
    methods: {
        goToNew(){
            this.$router.push('/new');
        },
        getUsername(conversation) {
            return conversation.users[1].id === this.userId ? conversation.users[0].username : conversation.users[1].username;
        },
        async getConversationList() {
            await this.$apollo.query({
                query: gql`
                    query GetAllConversationsByUser($id: String!) {
                        getAllConversationsByUser(userId: $id) {
                            id
                            users {
                                id
                                username
                            }
                            messages {
                                createdAt
                                id
                                text
                                authorId
                            }
                        }
                    }
                    `,
                variables: {
                    id: localStorage.getItem('id')
                }
            }).then(({ data }) => {
                this.conversations = data.getAllConversationsByUser;
            }).catch((error) => {
                console.error(error);
            });
        },
        async addMessage() {
            if (this.newMessage.trim() !== '') {
                await this.$apollo.mutate({
                    mutation: gql`
                        mutation CreateMessage($conversationId: String!, $text: String!, $userId: String!){
                            createMessage(
                                conversationId: $conversationId
                                text: $text
                                userId: $userId
                            ) {
                                authorId
                                createdAt
                                id
                                text
                            }
                        }
                    `,
                    variables: {
                    userId: this.userId,
                    text: this.newMessage,
                    conversationId: this.currentConversationId,
                    }
                }).then(() => {
                    this.newMessage = '';
                    this.getConversationList();
                }).catch((error) => {
                    console.error(error);
                });
            }
        },
        chooseConversation(conversation) {
            if (this.currentConversationId !== '') {
                this.socket.off(this.currentConversationId);
            }
            this.messages = conversation.messages;
            this.currentConversationId = conversation.id;
            if(conversation.users[0].id == this.userId){
                this.otherUser = conversation.users[1];
            } else {
                this.otherUser = conversation.users[0];
            }
            this.socket.on(this.currentConversationId, (data) => {
                this.messages = [...this.messages, data];
                console.log(data);
            });
            console.log(this.messages);
        },
    },
    mounted() {
        this.socket = io("ws://localhost:3000");
        this.socket.on("connect", () => {
            console.log("Connecté au serveur WebSocket");
        });
        this.getConversationList();
        this.userId = localStorage.getItem('userId');
    },
    name: 'PageAllConversation'
}

</script>

<style scoped>

.new{
    font-size: 2em;
    color: black;
    text-decoration: none;

}


.otherUser {
    text-align: center;
    opacity: 0.5;

}

.send_img {
    position: relative;
    height: 2vw;
}

.sendMessage {
    width: 10%;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: rgb(206, 206, 206);
    color: white;
}

.sendMessage:hover {
    background-color: rgb(189, 222, 240);
    transition: 0.3s;
    cursor: pointer;
}

.inputMessage {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2vh;
}

form {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

input {
    width: 80%;
    height: 50px;
    border-radius: 10px;
    border: none;
    padding-left: 10px;
    font-size: 1.5vh;
}

.button {
    width: 20%;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: rgb(189, 222, 240);
    color: white;
}

.boxAll {
    width: 80vw;
    height: 80vh;
    display: flex;
    background-color: rgb(239, 239, 239);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
}

.listeConversations {
    width: 30%;
    height: 100%;
    background-color: rgb(223, 223, 223);
    border-radius: 20px;
}

.conv {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;

}

.conversation {
    width: 100%;
    height: 100%;
    background-color: rgb(239, 239, 239);
    border-radius: 20px;
    max-height: 90%;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 1vh;
}

.nomConversation {
    width: 90%;
    height: 50px;
    background-color: rgb(245, 245, 245);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    transition: 0.3s;
}

.nomConversation:hover {
    background-color: rgb(193, 193, 193);
}

.messageLeft,
.messageRight {
    width: 45%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
}

.messageRight {
    background-color: rgb(189, 222, 240);
    margin-left: auto;
    margin-right: 1.5vw;
    justify-content: right;
}

.messageLeft {
    background-color: rgb(245, 245, 245);
    margin-left: 1.5vw;
    margin-right: auto;
    justify-content: left;
}
</style>
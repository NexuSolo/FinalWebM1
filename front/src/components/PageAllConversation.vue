<template>
    <div class="boxAll">
        <div class="listeConversations">
            <div class="conversations" v-for="(conversation, index) in conversations" :key="index">
                <div class="nomConversation" @click=chooseConversation(conversation)>
                    {{ conversation.user2.username }}
                </div>
            </div>
            <div class="nomConversation">
                <RouterLink class="new" to="/new">+</RouterLink>
            </div>

        </div>
        <div class="conv">

            <h1 class="otherUser">{{ otherUser.username }}</h1>


            <div class="conversation">


                <div class="messages" v-for="(message, index) in reversedMessages" :key="index">

                    <div class="messageRight" v-if="message.user == this.user">
                        {{ message.message }}
                    </div>

                    <div class="messageLeft" v-else>
                        {{ message.message }}
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

</template>

<script>

export default {

    data() {
        return {

            // DATABASE FACTICE

            user: {
                id: 1,
                username: 'Nicolas',
            },

            Jean: {
                id: 2,
                username: 'Jean',
            },

            Paul: {
                id: 3,
                username: 'Paul',
            },

            Marie: {
                id: 4,
                username: 'Marie',
            },

            newMessage: '',

            conversations: [],

            messages: [],

            otherUser: {},

        };
    },

    created() {
        this.conversations = [
            {
                id: 1,
                user1: this.user,
                user2: this.Jean,
                messages: [
                    { id: 1, user: this.user, message: 'Salut Jean, comment ça va ?' },
                    { id: 2, user: this.Jean, message: 'Salut, ça va bien et toi ?' },
                    { id: 3, user: this.user, message: 'Je vais bien, merci. Quoi de neuf ?' },
                    { id: 4, user: this.Jean, message: 'Pas grand-chose, juste du travail.' },
                    { id: 5, user: this.user, message: 'Je comprends, moi aussi.' },
                    { id: 6, user: this.Jean, message: 'As-tu des plans pour le week-end ?' },
                    { id: 7, user: this.user, message: 'Pas encore, et toi ?' },
                    { id: 8, user: this.Jean, message: 'Je pense aller à la plage.' },
                    { id: 9, user: this.user, message: 'Ça a l\'air sympa !' },
                    { id: 10, user: this.Jean, message: 'Oui, j\'espère que le temps sera clément.' },
                    { id: 11, user: this.user, message: 'Je l\'espère aussi pour toi.' },
                    { id: 12, user: this.Jean, message: 'Merci !' },
                    { id: 13, user: this.user, message: 'De rien !' },
                    { id: 14, user: this.Jean, message: 'Je dois y aller maintenant.' },
                    { id: 15, user: this.user, message: 'D\'accord, à plus tard.' },
                    { id: 16, user: this.Jean, message: 'À plus tard.' },
                    { id: 17, user: this.user, message: 'Salut Jean, es-tu là ?' },
                    { id: 18, user: this.Jean, message: 'Oui, je suis là.' },
                    { id: 19, user: this.user, message: 'J\'ai une question à te poser.' },
                    { id: 20, user: this.Jean, message: 'D\'accord, je t\'écoute.' },
                ],
            },
            {
                id: 2,
                user1: this.user,
                user2: this.Paul,
                messages: [
                    { id: 1, user: this.user, message: 'Salut Paul, as-tu avancé sur le projet ?' },
                    { id: 2, user: this.Paul, message: 'Salut, oui, j\'ai fait quelques progrès.' },
                    { id: 3, user: this.user, message: 'Super, peux-tu me dire ce que tu as fait ?' },
                    { id: 4, user: this.Paul, message: 'J\'ai terminé la partie front-end.' },
                    { id: 5, user: this.user, message: 'C\'est génial ! Et pour le back-end ?' },
                    { id: 6, user: this.Paul, message: 'Je n\'ai pas encore commencé.' },
                    { id: 7, user: this.user, message: 'D\'accord, je vais m\'en occuper.' },
                    { id: 8, user: this.Paul, message: 'Merci, ça m\'aiderait beaucoup.' },
                    { id: 9, user: this.user, message: 'Pas de problème, c\'est ce pour quoi nous sommes une équipe.' },
                    { id: 10, user: this.Paul, message: 'C\'est vrai. Merci encore.' },
                    { id: 11, user: this.user, message: 'De rien, je suis heureux de pouvoir aider.' },
                    { id: 12, user: this.Paul, message: 'Je vais continuer à travailler sur le front-end.' },
                    { id: 13, user: this.user, message: 'D\'accord, tiens-moi au courant.' },
                    { id: 14, user: this.Paul, message: 'Je le ferai.' },
                    { id: 15, user: this.user, message: 'Parfait, à plus tard.' },
                    { id: 16, user: this.Paul, message: 'À plus tard.' },
                    { id: 17, user: this.user, message: 'Salut Paul, comment ça se passe ?' },
                    { id: 18, user: this.Paul, message: 'Salut, tout se passe bien.' },
                    { id: 19, user: this.user, message: 'Super, continue comme ça.' },
                    { id: 20, user: this.Paul, message: 'Merci, je vais faire de mon mieux.' },
                ],
            },
            {
                id: 3,
                user1: this.user,
                user2: this.Marie,
                messages: [
                    { id: 1, user: this.user, message: 'Salut Marie, comment vas-tu ?' },
                    { id: 2, user: this.Marie, message: 'Salut, je vais bien et toi ?' },
                    { id: 3, user: this.user, message: 'Je vais bien, merci. Quoi de neuf ?' },
                    { id: 4, user: this.Marie, message: 'Pas grand-chose, juste du travail.' },
                ],
            }
        ];
    },
    computed: {
        reversedMessages() {
            return [...this.messages].reverse();
        }
    },
    methods: {
        addMessage() {
            if (this.newMessage.trim() !== '') {
                this.messages.push({
                    user: this.user,
                    message: this.newMessage.trim()
                });
                this.newMessage = '';
            }
        },
        chooseConversation(conversation) {
            this.messages = conversation.messages;
            this.otherUser = conversation.user2;
        },
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
    height: 100%;
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
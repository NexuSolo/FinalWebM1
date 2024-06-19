<template>
    <div class="boxAll">
        <div class="listeConversations">
            <div class="conversations" v-for="(conversation, index) in conversations" :key="index">
                <div class="nomConversation">
                    {{ conversation.nom }}
                </div>
            </div>

        </div>
        <div class="conv">
            <div class="conversation">
                <div class="messages" v-for="(message, index) in reversedMessages" :key="index">
    
                    <div class="messageRight" v-if="message.user == user.nom">
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
                    <button type="submit">Envoyer</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>

export default {

    data() {
        return {

            user: {
                id: 1,
                nom: 'Nicolas',
            },

            conversations: [
                {
                    id: 1,
                    nom: 'Nicolas',
                },
                {
                    id: 2,
                    nom: 'Jean',
                },
                {
                    id: 3,
                    nom: 'Paul',
                },
            ],

            messages: [
                {
                    id: 1,
                    user: 'Nicolas',
                    message: 'Salut',
                },
                {
                    id: 2,
                    user: 'Jean',
                    message: 'Salut',
                },
                {
                    id: 3,
                    user: 'Nicolas',
                    message: 'Comment ça va ?',
                },
                {
                    id: 4,
                    user: 'Jean',
                    message: 'Bien et toi ?',
                },
                {
                    id: 5,
                    user: 'Nicolas',
                    message: 'Bien',
                },
                {
                    id: 6,
                    user: 'Paul',
                    message: 'Tu fais quoi ?',
                },
                {
                    id: 7,
                    user: 'Nicolas',
                    message: 'Je suis en train de coder',
                },
                {
                    id: 8,
                    user: 'Paul',
                    message: 'Ok',
                },
                {
                    id: 9,
                    user: 'Jean',
                    message: 'Je reviens tout de suite',
                },
                {
                    id: 10,
                    user: 'Nicolas',
                    message: 'D\'accord',
                },
                {
                    id: 11,
                    user: 'Paul',
                    message: 'Tu codes quoi ?',
                },
                {
                    id: 12,
                    user: 'Nicolas',
                    message: 'Une application',
                },
                {
                    id: 13,
                    user: 'Paul',
                    message: 'Cool',
                },
                {
                    id: 14,
                    user: 'Jean',
                    message: 'Je suis de retour',
                },
                {
                    id: 15,
                    user: 'Nicolas',
                    message: 'Bienvenue',
                },
                {
                    id: 16,
                    user: 'Paul',
                    message: 'Tu as fini de coder ?',
                },
                {
                    id: 17,
                    user: 'Nicolas',
                    message: 'Pas encore',
                },
                {
                    id: 18,
                    user: 'Paul',
                    message: 'D\'accord',
                },
                {
                    id: 19,
                    user: 'Jean',
                    message: 'Je vais me coucher',
                },
                {
                    id: 20,
                    user: 'Nicolas',
                    message: 'Bonne nuit',
                },


            ],
        };
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
                    user: this.user.nom,
                    message: this.newMessage.trim()
                });
                this.newMessage = '';
            }
        }
    },


    name: 'PageAllConversation'


}

</script>

<style scoped>

.inputMessage {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
}

form{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    width: 80%;
    height: 50px;
    border-radius: 10px;
    border: none;
    padding-left: 10px;
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

.conv{
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
}

.nomConversation {
    width: 95%;
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
}

.messageLeft, .messageRight {
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
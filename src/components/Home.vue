<template>
    <div id='home'>
        <div class = 'Img'> <img src="../assets/producto2.png"> </div>
        <div class = 'Text'>
            <p class = 'Paragraph'>
                App donde se podrá gestionar los clientes y productos de una organización
            </p>
        </div>

    </div>
</template>

<script>
export default {
    name:"home",
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Handlee&display=swap');
#home{
    margin: 112px 0px;
    padding: 0%;
    height: 100%;
    width: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.Img{
    width: 30%;
    background-color: rgb(255, 255, 255);
    margin: 10px;
    padding: 20px;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid #000000;
}
.Text{
    width: 70%;
    background-color: rgb(255, 255, 255);
    padding: 20px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #000000;
    justify-content: center;
}
.Paragraph{
    font-family: 'Handlee', cursive;
    align-items: center;
    font-size: 20pt;
}
</style>
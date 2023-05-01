<script>
    import profile from '$lib/images/profile.jpg';
    import OptionRow from '$lib/components/OptionRow.svelte';
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app" />
</svelte:head>

<section>
    <img class="profile" src={profile} alt="Cole Boggus Profile" />
    <OptionRow options={[{text:'Experience', route: "/about/experience"}, {text:"Skills", route: "/about/skills"}, {text: "Education", route: "/about/education"}]} />
    <slot></slot>
</section>

<style>
    section::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    section::-webkit-scrollbar-track {
        background-color: #2f0303;
    }

    /* Handle */
    section::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 5px;
    }

    /* Handle on hover */
    section::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
    section {
        max-width: 80vw;
        width: 1200px;
        max-height: 70vh;
        overflow-y: auto;

        padding: 100px;
        margin: 2rem auto;
    }
    .profile {
        filter: glow(0.5rem 0.5rem 0.5rem #000);

        max-width: 400px;
    }


    h2 {
        font-weight: 600;
    }
    h3 img {
        vertical-align: text-top;
    }
</style>

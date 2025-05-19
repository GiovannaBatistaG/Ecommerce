<template>
  <section class="py-24 px-6 max-w-3xl mx-auto">
    <div class="mb-16 text-center">
      <h1 class="text-6xl font-bold text-indigo-900 mb-1">Entre em contato</h1>
      <p class="text-lg text-gray-700">
        Tem alguma dúvida, sugestão ou oportunidade? Envie uma mensagem abaixo e retornarei o mais breve possível.
      </p>
    </div>
    <form class="bg-gray-900/10 p-10 rounded-xl space-y-6">
      <div>
        <label class="block text-gray-800 font-medium mb-1" for="name">Nome</label>
        <input
          type="text"
          id="name"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label class="block text-gray-800 font-medium mb-1" for="email">E-mail</label>
        <input
          type="email"
          id="email"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label class="block text-gray-800 font-medium mb-1" for="message">Mensagem</label>
        <textarea
          id="message"
          rows="6"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition resize-none"
          placeholder="Digite sua mensagem..."
        ></textarea>
      </div>

      <div class="pt-4 text-center">
        <button
          type="submit"
          class="bg-indigo-600 text-white px-10 py-3 rounded-full hover:bg-indigo-700 transition text-lg font-semibold"
        >
          Enviar mensagem
        </button>
      </div>
    </form>

    
    <div class="mt-16 text-center text-2xl text-gray-600">
      <h1>Visite minhas redes sociais</h1>
      <div class="flex justify-center gap-10 mt-6">
      <a href="https://www.linkedin.com/in/giovanna-gon%C3%A7alves-3043a5206/" class="text-blue-600 hover:text-blue-800 transition" aria-label="LinkedIn">
        <i class="ri-linkedin-box-fill"></i>
        linkedin
      </a>
      <a href="https://github.com/Gibatijo" class="text-gray-900 hover:text-black transition" aria-label="GitHub">
        <i class="ri-github-fill"></i>
        GitHub
      </a>
      <a href="https://www.behance.net/giovanngonalv18" class="text-blue-500 hover:text-blue-700 transition" aria-label="Behance">
        <i class="ri-behance-fill"></i>
        Behance
      </a>
      </div>
    </div>
  </section>
</template>

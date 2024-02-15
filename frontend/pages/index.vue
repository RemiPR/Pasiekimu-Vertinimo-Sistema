<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Left side with the background image and text overlay -->
    <div class="flex w-3/5 h-full">
      <div class="relative w-full">
        <img
          src="./../static/welcome-page/welcome-bg.png"
          alt="bg-gradient"
          class="absolute w-full h-full object-cover"
        />
        <div class="absolute inset-0 flex items-center justify-center flex-col">
          <div class="text-center mb-4">
            <h1 class="text-white text-5xl font-semibold mb-6">
              <span class="bounce">c</span>
              <span class="bounce" style="animation-delay: 0.2s">o</span>
              <span class="bounce" style="animation-delay: 0.4s">n</span>
              <span class="bounce" style="animation-delay: 0.6s">s</span>
              <span class="bounce" style="animation-delay: 0.8s">o</span>
              <span class="bounce" style="animation-delay: 1s">l</span>
              <span class="bounce" style="animation-delay: 1.2s">e</span>
              <span class="bounce" style="animation-delay: 1.4s">.</span>
              <span class="bounce" style="animation-delay: 1.6s">l</span>
              <span class="bounce" style="animation-delay: 1.8s">o</span>
              <span class="bounce" style="animation-delay: 2s">g</span>
              <span class="bounce" style="animation-delay: 2.2s">(</span>
              <span class="bounce" style="animation-delay: 2.4s">"</span>
              <span class="bounce" style="animation-delay: 2.6s">H</span>
              <span class="bounce" style="animation-delay: 2.8s">e</span>
              <span class="bounce" style="animation-delay: 3s">l</span>
              <span class="bounce" style="animation-delay: 3.2s">l</span>
              <span class="bounce" style="animation-delay: 3.4s">o</span>
              <span class="bounce" style="animation-delay: 3.6s">,</span>
              <span class="bounce" style="animation-delay: 3.8s"> </span>
              <span class="bounce" style="animation-delay: 4s">W</span>
              <span class="bounce" style="animation-delay: 4.2s">o</span>
              <span class="bounce" style="animation-delay: 4.4s">r</span>
              <span class="bounce" style="animation-delay: 4.6s">l</span>
              <span class="bounce" style="animation-delay: 4.8s">d</span>
              <span class="bounce" style="animation-delay: 5s">!</span>
              <span class="bounce" style="animation-delay: 5.2s">"</span>
              <span class="bounce" style="animation-delay: 5.4s">)</span>
            </h1>
            <p class="text-white text-xl">Pasiruošę išbandyti savo jėgas?</p>
          </div>

          <div class="absolute bottom-0 scale-x-150 w-full flex justify-center">
            <img
              src="./../static/welcome-page/illustration-container.png"
              alt="cloud-shape"
              class="w-auto h-auto"
            />
            <div class="absolute flex items-start justify-center w-full"></div>
            <div class="absolute inset-0 flex items-end justify-center">
              <img
                src="./../static/welcome-page/welcome-illustration-left.png"
                alt="Left Illustration"
                class="w-64 h-64"
              />
              <img
                src="./../static/welcome-page/welcome-illustration-right.png"
                alt="Right Illustration"
                class="w-64 h-64"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-2/5 items-center justify-center bg-white p-12 relative">
      <div class="absolute top-0 left-0 m-8">
        <img
          src="@/static/shared/kvk-logo.svg"
          alt="Logo"
          class="h-16 w-auto"
        />
      </div>
      <div class="absolute top-0 right-0 m-4">
        <button class="p-2 bg-gray-200 rounded-full">EN</button>
      </div>
      <div class="w-full max-w-md mx-auto">
        <h2 class="text-3xl font-bold mb-10">Prisijunkite</h2>
        <form @submit.prevent="login">
          <div class="mb-6">
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Įveskite el. pašto adresą</label
            >
            <input
              id="email"
              type="email"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Įveskite slaptažodį</label
            >
            <input
              id="password"
              type="password"
              class="w-full p-3 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div class="flex items-center justify-between mb-6">
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox h-5 w-5" />
              <span class="ml-2 text-sm text-gray-600">Įsiminti</span>
            </label>
            <a href="#" class="text-sm text-blue-500 hover:text-blue-700"
              >Pamiršote slaptažodį?</a
            >
          </div>
          <button
            @click="goToAdmin"
            type="submit"
            class="w-full p-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Prisijungti
          </button>
          <p class="mt-6 text-center text-gray-600">Neturite paskyros?</p>
          <hr class="my-4 border-gray-300" />
          <a
            href="#"
            class="block text-center text-lg text-blue-500 hover:text-blue-700 font-semibold"
          >
            Prisijunkite kaip svečias
          </a>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.bounce {
  display: inline-block;
  animation-name: bounce;
  animation-duration: 0.5s; /* speed of each bounce */
  animation-fill-mode: both; /* keep the view in the end state of the last keyframe when the animation is not running */
  animation-iteration-count: 1; /* makes the animation repeat infinitely */
}

/* Set the animation delay based on the index of the letter */
/* and the duration of the animation for the full cycle */
.bounce:nth-child(1) {
  animation-delay: 0s;
}
.bounce:nth-child(2) {
  animation-delay: 0.5s;
}
.bounce:nth-child(3) {
  animation-delay: 1s;
}
.bounce:nth-child(4) {
  animation-delay: 1.5s;
}
.bounce:nth-child(5) {
  animation-delay: 2s;
}
.bounce:nth-child(6) {
  animation-delay: 2.5s;
}
.bounce:nth-child(7) {
  animation-delay: 3s;
}
.bounce:nth-child(8) {
  animation-delay: 3.5s;
}
.bounce:nth-child(9) {
  animation-delay: 4s;
}
.bounce:nth-child(10) {
  animation-delay: 4.5s;
}
.bounce:nth-child(11) {
  animation-delay: 5s;
}
.bounce:nth-child(12) {
  animation-delay: 5.5s;
}
.bounce:nth-child(13) {
  animation-delay: 0s;
}
.bounce:nth-child(14) {
  animation-delay: 0.5s;
}
.bounce:nth-child(15) {
  animation-delay: 1s;
}
.bounce:nth-child(16) {
  animation-delay: 1.5s;
}
.bounce:nth-child(17) {
  animation-delay: 2s;
}
.bounce:nth-child(18) {
  animation-delay: 2.5s;
}
.bounce:nth-child(19) {
  animation-delay: 3s;
}
.bounce:nth-child(20) {
  animation-delay: 3.5s;
}
.bounce:nth-child(21) {
  animation-delay: 4s;
}
.bounce:nth-child(22) {
  animation-delay: 4.5s;
}
.bounce:nth-child(23) {
  animation-delay: 5s;
}
.bounce:nth-child(24) {
  animation-delay: 5.5s;
}
.bounce:nth-child(25) {
  animation-delay: 4.5s;
}
.bounce:nth-child(26) {
  animation-delay: 5s;
}
.bounce:nth-child(27) {
  animation-delay: 5.5s;
}
/* Set an animation interval */
/* Total time for one full cycle of animation */
/* This should be the sum of the individual animation duration (0.5s) and delays */
.bounce {
  animation-timing-function: linear; /* makes the animation proceed at an even pace */
  animation-duration: 6s; /* the full duration for the cycle to complete */
  animation-iteration-count: infinite;
}
</style>

<script>
export default {
  methods: {
    goToAdmin() {
      this.$router.push("/admin");
    },
  },
};
</script>

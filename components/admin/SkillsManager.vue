<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-text-primary">
        Gestion des Compétences
      </h2>
      <button
        @click="$emit('openSkillModal')"
        class="bg-accent text-white px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors font-medium shadow-lg"
      >
        + Nouvelle Compétence
      </button>
    </div>

    <div class="space-y-8">
      <div
        v-for="(skills, categoryName) in skillsByCategory"
        :key="categoryName"
        class="space-y-4"
      >
        <h3
          class="text-lg font-semibold text-text-primary border-l-4 border-accent pl-4"
        >
          {{ categoryName }}
        </h3>
        <div
          :ref="el => setSkillsContainer(el, categoryName)"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <div
            v-for="(skill, index) in skills"
            :key="skill.name"
            :data-swapy-slot="`slot-${index}`"
            class="min-h-[120px]"
          >
            <div
              :data-swapy-item="skill.name"
              class="bg-bg-primary border border-border-primary rounded-2xl shadow-sm overflow-hidden relative group cursor-move hover:border-accent w-full h-full"
            >
              <div class="p-3">
                <div
                  class="flex items-center space-x-2 mb-2 pointer-events-none"
                >
                  <img
                    v-if="skill.icon"
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-6 h-6"
                    :class="{ 'filter invert': skill.invert }"
                  />
                  <h4 class="font-medium text-text-primary text-sm">
                    {{ skill.name }}
                  </h4>
                </div>
                <div class="flex space-x-1" @click.stop>
                  <button
                    @click="$emit('editSkill', skill)"
                    class="px-2 py-1 bg-accent text-white text-xs rounded-md hover:bg-accent/80 font-medium"
                  >
                    Modifier
                  </button>
                  <button
                    @click="$emit('deleteSkill', skill.name)"
                    class="px-2 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const props = defineProps<{
  skillsByCategory: Record<string, any[]>;
}>();

const emit = defineEmits<{
  openSkillModal: [];
  editSkill: [skill: any];
  deleteSkill: [skillName: string];
  updateSkills: [skills: Record<string, any[]>];
}>();

const skillsContainers = ref<Record<string, HTMLElement>>({})
let skillsSwapyInstances: Record<string, any> = {};

const setSkillsContainer = (el: HTMLElement | null, categoryName: string) => {
  if (el) {
    skillsContainers.value[categoryName] = el
  }
}

const initializeSkillsSwapy = async () => {
  if (import.meta.client) {
    try {
      const { createSwapy } = await import("swapy");

      Object.keys(props.skillsByCategory).forEach((categoryName) => {
        const container = skillsContainers.value[categoryName]
        const skills = props.skillsByCategory[categoryName];

        if (container && skills.length > 0) {
          const swapyInstance = createSwapy(container);

          swapyInstance.onSwap((event: any) => {
            const newOrder = event.newSlotItemMap.asArray;

            const reorderedSkills = newOrder.map((slot: any, index: number) => {
              const skill = skills.find((s) => s.name === slot.item);
              return {
                ...skill,
                order: index + 1,
              };
            });

            const updatedSkillsByCategory = {
              ...props.skillsByCategory,
              [categoryName]: reorderedSkills,
            };
            emit("updateSkills", updatedSkillsByCategory);
          });

          skillsSwapyInstances[categoryName] = swapyInstance;
        }
      });
    } catch (error) {
      console.error("Error initializing Skills Swapy:", error);
    }
  }
};

const destroySkillsSwapy = () => {
  Object.values(skillsSwapyInstances).forEach((instance) => {
    if (instance) {
      instance.destroy();
    }
  });
  skillsSwapyInstances = {};
};

onMounted(() => {
  nextTick(() => {
    initializeSkillsSwapy();
  });
});

onUnmounted(() => {
  destroySkillsSwapy();
});
</script>


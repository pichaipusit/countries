<template>
  <div class="w-full flex justify-center">
    <input
      type="text"
      v-model="search"
      class="mb-8 min-w-24 md:w-1/4 rounded-md border border-gray-300 bg-white px-4 py-3 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
      placeholder="Thailand, Japan, Korea"
    />
    <div
      class="pointer-events-none absolute inset-y-0 right-0 mr-3 flex items-center"
    ></div>
  </div>

  <div class="flex flex-col justify-center items-center w-full gap-y-2">
    <el-table
      :data="displayData"
      style="width: 80%"
      header-style="background-color: #3f1785;"
    >
      <el-table-column label="Country Name">
        <template #default="{ row }">
          <NuxtLink
            :to="`https://www.youtube.com/results?search_query=${row.countryName}+travel`"
            target="_blank"
            class="text-[var(--prim-color)] font-semibold underline-offset-2 hover:underline"
            >{{ row.countryName }}</NuxtLink
          >
        </template>
      </el-table-column>
      <el-table-column label="Capital City" prop="capitalCity" />
      <el-table-column fixed="right" label="Country Flag" width="120">
        <template #default="{ row }">
          <img :src="row.countryFlag" alt="Country Flag" class="w-14 md:w-30" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="filterTableData.length"
      @current-change="(val) => (currentPage = val)"
      :current-page="currentPage"
      :page-size="pageSize"
    />
  </div>
</template>

<script lang="ts" setup>
const currentPage = ref(1);
const currentPageData = ref([]);
const pageSize = ref(10);

// ----- Fetch table's data
const {
  data: countries,
  pending,
  error,
  refresh,
} = await useFetch("https://restcountries.com/v3.1/all", {
  transform: (countries) => {
    return countries.map((country) => ({
      countryName: country.name.common,
      capitalCity: Array.isArray(country.capital)
        ? country.capital[0]
        : country.capital,
      countryFlag: country.flags.svg,
    }));
  },
});
if (error.value) {
  throw createError({
    ...error.value,
    statusMessage: `Could not fetch data for table`,
  });
}

// ----- Table pagination and search
const search = ref("");
const filterTableData = computed(() => {
  return countries.value.filter(
    (data) =>
      !search.value ||
      data.countryName?.toLowerCase().includes(search.value.toLowerCase()) ||
      data.capitalCity?.toLowerCase().includes(search.value.toLowerCase())
  );
});
const displayData = computed(() => {
  return calculateCurrentPageData();
});
const calculateCurrentPageData = () => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filterTableData.value.slice(startIndex, endIndex);
};
</script>

<style scoped>
:deep(.el-pager li.is-active) {
  background-color: var(--prim-color) !important;
}
</style>

export const run = async ({ params, api, logger }) => {

    const handle = await api.enqueue(api.shopifyPartnerApi,
        { accessToken: "", organizationId: "" },
        {
            startAt: new Date(Date.now() + 60 * 1000), // 1 minutes from now
            retries: 0
        }
    );
};

export const options = {
    timeoutMS: 3600000,
    returnType: true,
    triggers: {
        scheduler: [
            { every: "hour", at: "45 mins" },
        ],
    },
};



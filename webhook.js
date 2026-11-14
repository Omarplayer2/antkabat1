async function sendDiscordNotification(title, description, winnerName = null) {
    // ⚠️ ضع رابط Webhook الخاص بقناتك هنا
    const webhookUrl = "https://discord.com/api/webhooks/1570811354477105192/4LUZXc9QDBtSKXzRpz9G6VZvL5MOpVSsKlHYpcN_ixEgwOPUyoq_jqPncemxDyqNBeuV";

    let colorNumber = 0xeb459e;
    if (winnerName) colorNumber = 0xffd700; // لون ذهبي لإعلان المتأهلين

    const embed = {
        title: `⚔️ ${title}`,
        description: description,
        color: colorNumber,
        fields: winnerName ? [
            { 
                name: "🏆 نتيجة المواجهة والتأهل", 
                value: `الف مبروك لـ **${winnerName}**! 🎉\nتم حسم الجولة بنجاح، والبطل ينتقل رسمياً إلى **الدور القادم** لمواصلة التحدي! 🔥`, 
                inline: false 
            }
        ] : [],
        footer: {
            text: "Discord Ultimate Election 2026 • نظام الإقصاء المباشر"
        },
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: "@everyone @here 🚨 **انتهت الجولة وحُسمت النتيجة!**",
                embeds: [embed]
            })
        });

        if (response.ok) {
            console.log("تم إرسال الإشعار إلى ديسكورد بنجاح!");
        } else {
            console.error("فشل إرسال الإشعار إلى ديسكورد.");
        }
    } catch (error) {
        console.error("خطأ في الاتصال بالـ Webhook:", error);
    }
}
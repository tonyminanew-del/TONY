const firebaseConfig = {
    apiKey: "AIzaSyBGM0xBeu0wc2JV_4hgymDMDi1jlltf8SI",
    authDomain: "marygrgs.firebaseapp.com",
    projectId: "marygrgs",
    storageBucket: "marygrgs.firebasestorage.app",
    messagingSenderId: "866893606556",
    appId: "1:866893606556:web:d2b7bab1c8dcd8fd038759",
    measurementId: "G-YRH69L594N"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
    // 1. فحص هل الأدمن مسجل دخول من قبل كدة؟ لو أيوة، وديه على لوحة التحكم فوراً
    if (localStorage.getItem("adminLoggedIn") === "true") {
        window.location.href = "admin.html";
        return;
    }

    const adminForm = document.getElementById("adminForm");
    const nameInput = document.getElementById("adminName");
    const phoneInput = document.getElementById("adminPhone");
    const titleSelect = document.getElementById("adminTitle");

    // لو الفورم مش موجود في الصفحة دي اتخطى الخطوة
    if (!adminForm) return;

    adminForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const title = titleSelect.value;

        if (name !== "" && phone !== "") {
            try {
                // حفظ البيانات الأساسية في قاعدة البيانات (Firebase)
                await db.collection("admins").add({
                    name: name,
                    phone: phone,
                    title: title,
                    createdAt: new Date()
                });

                // تسجيل علامة في المتصفح أنه سجل دخول عشان المرة الجاية يدخل عل طول
                localStorage.setItem("adminLoggedIn", "true");

                // الانتقال للوحة التحكم
                window.location.href = "admin.html";
                
            } catch (error) {
                console.error("خطأ أثناء حفظ البيانات: ", error);
                alert("حدث خطأ في الاتصال بقاعدة البيانات، يرجى المحاولة مرة أخرى.");
            }
        } else {
            alert("يرجى إدخال الاسم ورقم الهاتف بشكل صحيح!");
        }
    });
});
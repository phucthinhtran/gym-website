import { videos } from "./videos";

export const exercises = [
  {
    id: 1,
    slug: "Dumbell-bench-press",
    name: "Đẩy ngực với tạ đơn",
    english: "Dumbbell Bench Press",
    muscle: "Ngực",
    secondaryMuscle: "Tay sau, vai trước",
    equipment: "Tạ đơn",
    level: "Người mới",
    type: "Đa khớp",
    bodyRegion: "Thân trên",
    video: videos.dumbbellBenchPress,

    description:
      "Bài tập phát triển cơ ngực, đồng thời có sự tham gia của cơ tay sau và vai trước.",

    instructions: [
      "Nằm trên ghế phẳng, đặt hai chân vững trên sàn.",
      "Giữ tạ ở hai bên ngực, cổ tay thẳng.",
      "Đẩy tạ lên có kiểm soát.",
      "Hạ tạ từ từ về vị trí ban đầu.",
    ],

    tips: [
      "Khởi động kỹ vai và khuỷu tay.",
      "Giữ chuyển động chậm, có kiểm soát.",
      "Chọn mức tạ phù hợp với kỹ thuật.",
    ],

    mistakes: [
      "Cong cổ tay quá mức.",
      "Đẩy tạ mất kiểm soát.",
      "Nhấc hông khỏi ghế.",
      "Sử dụng mức tạ quá nặng.",
    ],

    safety: [
      "Bắt đầu với mức tạ nhẹ.",
      "Dừng tập nếu có cảm giác đau bất thường.",
      "Nhờ người hướng dẫn kiểm tra kỹ thuật khi cần.",
    ],
  },
  {
    id: 2,
    slug: "barbell-back-squat",
    name: "Squat",
    english: "Barbell Back Squat",
    muscle: "Chân",
    secondaryMuscle: "Mông, cơ lõi",
    equipment: "Thanh đòn",
    level: "Khó",
    type: "Đa khớp",
    bodyRegion: "Thân dưới",
    video: videos.barbellbacksquat,

    description: "Bài tập tác động chủ yếu vào cơ đùi trước và cơ mông.",

    instructions: [
      "Đứng vững, hai chân rộng khoảng bằng vai.",
      "Hạ người xuống có kiểm soát.",
      "Đứng lên và trở về vị trí ban đầu.",
    ],

    tips: [
      "Giữ lưng ở tư thế tự nhiên.",
      "Kiểm soát chuyển động trong suốt bài tập.",
    ],

    mistakes: [
      "Nhấc gót chân khỏi sàn.",
      "Hạ người quá nhanh và mất kiểm soát.",
    ],

    safety: [
      "Khởi động kỹ trước khi tập.",
      "Bắt đầu với mức tạ nhẹ và có người hướng dẫn.",
    ],
  },

  {
    id: 3,
    slug: "pull-up",
    name: "Kéo xà",
    english: "Pull Up",
    muscle: "Lưng",
    secondaryMuscle: "Tay trước, vai sau",
    equipment: "Xà đơn",
    level: "Người mới",
    type: "Đa khớp",
    bodyRegion: "Thân trên",
    video: videos.pullup,

    description:
      "Pull Up là bài tập sử dụng trọng lượng cơ thể, tác động chủ yếu vào cơ xô và cơ lưng trên, đồng thời phát triển sức mạnh cơ tay trước và khả năng kiểm soát thân người.",

    instructions: [
      "Đứng dưới thanh xà, nắm thanh xà với lòng bàn tay hướng ra phía trước, hai tay rộng hơn vai một chút.",
      "Treo người trên xà, giữ vai ổn định và siết nhẹ cơ bụng.",
      "Kéo cơ thể lên có kiểm soát cho đến khi cằm vượt qua thanh xà nếu có thể.",
      "Giữ thân người ổn định, tránh đung đưa hoặc dùng lực quán tính.",
      "Từ từ hạ người xuống về vị trí ban đầu và lặp lại động tác.",
    ],

    tips: [
      "Tập trung sử dụng cơ lưng để kéo cơ thể lên.",
      "Giữ cơ bụng ổn định trong suốt chuyển động.",
      "Thực hiện chậm và có kiểm soát.",
      "Người mới có thể bắt đầu bằng bài kéo xô hoặc hít xà có hỗ trợ.",
      "Ưu tiên kỹ thuật đúng hơn số lần thực hiện.",
    ],

    mistakes: [
      "Đung đưa cơ thể để tạo lực kéo.",
      "Rướn cổ quá mức để đưa cằm qua xà.",
      "Co vai lên gần tai khi kéo.",
      "Hạ người quá nhanh và mất kiểm soát.",
      "Thực hiện động tác với biên độ không phù hợp.",
    ],

    safety: [
      "Kiểm tra thanh xà chắc chắn trước khi tập.",
      "Khởi động kỹ vai, khuỷu tay và cổ tay.",
      "Sử dụng dây hoặc máy hỗ trợ nếu chưa đủ sức thực hiện.",
      "Không cố kéo người lên bằng cách giật mạnh.",
      "Dừng tập nếu xuất hiện đau bất thường ở vai hoặc khuỷu tay.",
    ],
  },
  {
    id: 4,
    slug: "barbell-shoulder-press",
    name: "Đẩy vai với tạ đòn",
    english: "Barbell Shoulder Press",
    muscle: "Vai",
    secondaryMuscle: "Tay sau",
    equipment: "Thanh đòn",
    level: "Trung bình",
    type: "Đa khớp",
    bodyRegion: "Thân trên",
    video: videos.shoulderpress,

    description:
      "Barbell Shoulder Press là bài tập đẩy tạ đòn qua đầu, tác động chủ yếu vào cơ vai trước và vai giữa, đồng thời có sự tham gia của cơ tay sau và các nhóm cơ giúp ổn định thân người.",

    instructions: [
      "Đứng thẳng, hai chân rộng khoảng bằng vai, giữ cơ bụng ổn định.",
      "Nắm thanh đòn rộng hơn vai một chút, đặt thanh ở phía trước vai trên.",
      "Giữ cổ tay tương đối thẳng và khuỷu tay ở vị trí phù hợp bên dưới thanh đòn.",
      "Đẩy thanh đòn lên trên đầu theo đường chuyển động có kiểm soát.",
      "Khi thanh đòn vượt qua đầu, đưa đầu nhẹ về vị trí trung lập để thanh nằm phía trên thân người.",
      "Từ từ hạ thanh đòn về vị trí ban đầu và lặp lại động tác.",
    ],

    tips: [
      "Giữ cơ bụng và cơ mông ổn định để hạn chế ưỡn lưng.",
      "Duy trì đường di chuyển của thanh đòn gần cơ thể.",
      "Thở ra khi đẩy tạ lên và hít vào khi hạ tạ xuống.",
      "Giữ cổ tay ở tư thế ổn định trong suốt chuyển động.",
      "Ưu tiên kỹ thuật đúng và chuyển động có kiểm soát.",
    ],

    mistakes: [
      "Ưỡn lưng dưới quá mức khi đẩy tạ.",
      "Đẩy thanh đòn quá xa về phía trước.",
      "Sử dụng lực chân để đẩy tạ trong khi thực hiện Strict Press.",
      "Để cổ tay gập quá mức.",
      "Hạ thanh đòn quá nhanh và mất kiểm soát.",
    ],

    safety: [
      "Khởi động kỹ khớp vai, khuỷu tay và cổ tay trước khi tập.",
      "Bắt đầu với thanh đòn nhẹ hoặc mức tạ phù hợp.",
      "Đảm bảo không gian phía trên đủ rộng để đẩy tạ.",
      "Có người hướng dẫn kiểm tra kỹ thuật khi mới tập.",
      "Dừng tập nếu xuất hiện đau bất thường ở vai hoặc lưng.",
    ],
  },
  {
    id: 5,
    slug: "barbell-biceps-curl",
    name: "Cuốn tạ đòn tập tay trước",
    english: "Barbell Biceps Curl",
    muscle: "Tay",
    secondaryMuscle: "Cẳng tay",
    equipment: "Thanh đòn",
    level: "Người mới",
    type: "Đơn khớp",
    bodyRegion: "Thân trên",
    video: videos.barbellcurl,

    description:
      "Bài tập tập trung phát triển cơ tay trước, hỗ trợ sức mạnh khi thực hiện các động tác kéo.",

    instructions: [
      "Đứng thẳng, hai tay cầm thanh tạ.",
      "Giữ khuỷu tay gần thân người.",
      "Gập khuỷu tay để nâng tạ lên.",
      "Hạ tạ từ từ về vị trí ban đầu.",
    ],

    tips: [
      "Giữ phần thân trên ổn định.",
      "Tập trung vào chuyển động của khuỷu tay.",
      "Thực hiện chậm và kiểm soát.",
    ],

    mistakes: [
      "Đung đưa thân người để nâng tạ.",
      "Di chuyển khuỷu tay quá nhiều.",
      "Hạ tạ quá nhanh.",
    ],

    safety: [
      "Bắt đầu với mức tạ phù hợp.",
      "Tránh giật mạnh khi nâng tạ.",
      "Giữ cổ tay ở tư thế tự nhiên.",
    ],
  },
  {
    id: 6,
    slug: "situp",
    name: "Gập bụng",
    english: "Sit up",
    muscle: "Bụng",
    secondaryMuscle: "Không đáng kể",
    equipment: "Thảm tập",
    level: "Người mới",
    type: "Đơn khớp",
    bodyRegion: "Cơ lõi",
    video: videos.situp,

    description:
      "Sit Up là bài tập sử dụng trọng lượng cơ thể, tác động chủ yếu vào cơ bụng và cơ gập hông. Bài tập giúp cải thiện sức mạnh cơ bụng, khả năng kiểm soát thân người và hỗ trợ các hoạt động vận động hằng ngày.",

    instructions: [
      "Nằm ngửa trên thảm tập, gập hai đầu gối và đặt bàn chân vững trên sàn.",
      "Đặt hai tay trước ngực hoặc nhẹ nhàng ở hai bên đầu.",
      "Siết cơ bụng, từ từ nâng đầu, vai và thân trên khỏi mặt sàn.",
      "Tiếp tục nâng thân người về phía đầu gối cho đến khi đạt tư thế ngồi.",
      "Từ từ hạ thân người xuống vị trí ban đầu.",
      "Lặp lại động tác với nhịp độ có kiểm soát.",
    ],

    tips: [
      "Thở ra khi nâng thân người lên và hít vào khi hạ xuống.",
      "Tập trung kiểm soát chuyển động bằng cơ bụng.",
      "Giữ bàn chân ổn định trên mặt sàn.",
      "Thực hiện động tác chậm và đều.",
      "Ưu tiên kỹ thuật đúng hơn số lần thực hiện.",
    ],

    mistakes: [
      "Dùng tay kéo mạnh đầu và cổ khi nâng người.",
      "Sử dụng lực quán tính để bật thân người lên.",
      "Thực hiện động tác quá nhanh.",
      "Cong hoặc gập cổ quá mức.",
      "Hạ người xuống quá nhanh và mất kiểm soát.",
    ],

    safety: [
      "Khởi động nhẹ trước khi tập.",
      "Sử dụng thảm tập để tạo sự thoải mái cho lưng.",
      "Không dùng tay kéo cổ khi nâng thân người.",
      "Bắt đầu với số lần phù hợp với khả năng.",
      "Nếu cảm thấy khó chịu ở lưng, có thể lựa chọn bài tập cơ bụng khác phù hợp hơn.",
      "Dừng tập nếu xuất hiện đau bất thường ở vùng lưng hoặc cổ.",
    ],
  },
  {
    id: 7,
    slug: "barbell-hip-thrust",
    name: "Đẩy hông với thanh đòn",
    english: "Barbell Hip Thrust",
    muscle: "Mông",
    secondaryMuscle: "Đùi sau, cơ lõi",
    equipment: "Thanh đòn, ghế tập",
    level: "Trung bình",
    type: "Đa khớp",
    bodyRegion: "Thân dưới",
    video: videos.barbellhipthrust,

    description:
      "Bài tập tập trung phát triển sức mạnh cơ mông thông qua chuyển động duỗi hông.",

    instructions: [
      "Ngồi trên sàn, tựa phần lưng trên vào ghế chắc chắn.",
      "Đặt thanh đòn có đệm bảo vệ ngang vùng hông.",
      "Đặt hai bàn chân vững trên sàn, gập gối.",
      "Đẩy hông lên có kiểm soát đến khi thân người gần thẳng.",
      "Hạ hông từ từ về vị trí ban đầu.",
    ],

    tips: [
      "Giữ cằm hơi thu về phía ngực.",
      "Tập trung siết cơ mông khi nâng hông.",
      "Kiểm soát chuyển động thay vì dùng quán tính.",
    ],

    mistakes: [
      "Ưỡn lưng dưới quá mức.",
      "Đặt bàn chân quá xa hoặc quá gần.",
      "Nâng hông quá nhanh.",
    ],

    safety: [
      "Sử dụng đệm bảo vệ thanh đòn.",
      "Kiểm tra ghế tập chắc chắn trước khi thực hiện.",
      "Bắt đầu với mức tạ nhẹ và học kỹ thuật đúng.",
    ],
  },
];

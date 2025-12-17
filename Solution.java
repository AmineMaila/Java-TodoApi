class Solution {
	public static String rangeExtraction(int[] arr) {
		int s = 0, f = 1;
		StringBuilder sb = new StringBuilder();
	
		while (f < arr.length) {
			if (arr[f] == (arr[f - 1] + 1)) {
				f++;
				continue;
			}

			if (f - s > 2) {
				sb.append(arr[s] + "-" + arr[f - 1] + ",");
				s = f;
			} else {
				while (s < f)
					sb.append(arr[s++] + ",");
			}
			f++;
		}
		if (f - s > 2) {
			sb.append(arr[s] + "-" + arr[f - 1]);
			s = f;
		} else {
			while (s < f - 1)
				sb.append(arr[s++] + ", ");
			sb.append(arr[s++]);

		}
		
		return sb.toString();
	}
	public static void main(String[] args) {
		System.out.println(rangeExtraction(new int[]{-3,-2,-1,2,10,15,16,18,19,20}));
	}
}